import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { fetchDrinkReq, fetchFoodReq } from '../services/APIs';
import IngredientsCheckbox from '../components/IngredientsCheckbox';
import Context from '../context/Context';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../utils/index';
import '../style/RecipeInProgress.css';

const handleStateAndStorage = ({
  inProgressRecipes,
  setUsedIngredients,
  usedIngredients,
  type,
  id,
}) => {
  if (!inProgressRecipes) {
    localStorage.setObj('inProgressRecipes', {
      cocktails: {},
      meals: {},
    });
    setUsedIngredients({
      cocktails: {},
      meals: {},
    });
  } else {
    const recipeType = type === 'meals' ? 'meals' : 'cocktails';
    const inProgressRecipesKeys = Object.keys(inProgressRecipes[recipeType])
      .includes(id);

    if (!inProgressRecipesKeys) {
      localStorage.setObj('inProgressRecipes', {
        ...inProgressRecipes,
        [recipeType]: {
          ...inProgressRecipes[recipeType],
          [id]: [],
        },
      });
      setUsedIngredients({
        ...usedIngredients,
        [recipeType]: {
          ...usedIngredients[recipeType],
          [id]: [],
        },
      });
    }
  }
};

const handleClick = ({ id, type, key, detailsData, history }) => {
  const doneRecipes = localStorage.getObj('doneRecipes');
  // https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  const doneRecipeObj = {
    id,
    type: type === 'meals' ? 'comida' : 'bebida',
    area: type === 'drinks' ? '' : detailsData.strArea,
    category: detailsData.strCategory,
    alcoholicOrNot: type === 'meals' ? '' : detailsData.strAlcoholic,
    name: detailsData[`str${key}`],
    image: detailsData[`str${key}Thumb`],
    doneDate: date,
    tags: [...[detailsData.strTags]],
  };
  localStorage.setObj('doneRecipes', [...doneRecipes, doneRecipeObj]);

  history.push('/receitas-feitas');
};

const recipeTypeToggle = (type, param1, param2) => (type === 'meals' ? param1 : param2);

function RecipeInProgress() {
  const { usedIngredients,
    setUsedIngredients } = useContext(Context);
  const [detailsData, setDetailsData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const location = useLocation();
  const path = location.pathname;
  const id = path.split('/')[2];
  const type = path.includes('comidas') ? 'meals' : 'drinks';
  const requisition = recipeTypeToggle(type, fetchFoodReq, fetchDrinkReq);
  const key = recipeTypeToggle(type, 'Meal', 'Drink');
  const recipeType = type === 'meals' ? 'meals' : 'cocktails';
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  useEffect(() => {
    const getRecipeDetails = async () => {
      const response = await requisition('lookup', 'i', id);
      const recipeDetails = response[type][0];
      setDetailsData(recipeDetails);
    };
    getRecipeDetails();
  }, [type, requisition, id]);

  useEffect(() => {
    const getKeyValues = async (keySearched, setData) => {
      const response = await requisition('lookup', 'i', id);
      const recipeDetails = response[type][0];
      const searchedKey = Object.entries(recipeDetails)
        .filter((item) => (item[0].includes(keySearched)
        && item[1] ? item : null));

      const ingredientesData = searchedKey.map((item) => item[1]);
      setData(ingredientesData);
    };
    getKeyValues('Ingredient', setIngredients);
    getKeyValues('Measure', setMeasures);
  }, [type, requisition, id]);

  useEffect(() => {
    const inProgressRecipes = localStorage.getObj('inProgressRecipes');
    const paramObj = {
      inProgressRecipes,
      setUsedIngredients,
      usedIngredients,
      type,
      id,
    };
    handleStateAndStorage(paramObj);
  }, [id, type, setUsedIngredients, usedIngredients]);

  if (!detailsData || !ingredients) return <h3> Loading...</h3>;

  return (
    <main>
      <section className="details-container">
        <div className="img-container">
          <img
            className="details-image"
            src={ detailsData[`str${key}Thumb`] }
            alt=""
            data-testid="recipe-photo"
            width="300"
          />
        </div>
        <div className="main-details-container">
          <h3
            className="recipe-title"
            data-testid="recipe-title"
          >
            {detailsData[`str${key}`]}
          </h3>
          <h4 data-testid="recipe-category" className="recipe-category-drink">
            { key === 'Drink' && detailsData.strAlcoholic }
          </h4>
          <div className="btn-container-details">
            <ShareButton testId="share-btn" route={ path } />
            <FavoriteButton
              id={ id }
              type={ type === 'drinks' ? 'bebida' : 'comida' }
              area={ type === 'drinks' ? '' : detailsData.strArea }
              category={ detailsData.strCategory }
              alcoholicOrNot={ type === 'meals' ? '' : detailsData.strAlcoholic }
              name={ detailsData[`str${key}`] }
              image={ detailsData[`str${key}Thumb`] }
            />
          </div>
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            { detailsData.strCategory }
          </p>
        </div>
        <div className="ingredients-main-container">
          <h3 className="ingredients-title">Ingredients</h3>
          <div className="ingredients-container">
            { ingredients.map((ingredient, index) => (
              <p
                key={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className="details-ingredient"
              >
                <IngredientsCheckbox
                  type={ type }
                  id={ id }
                  index={ index }
                  ingredient={ ingredient }
                />
                {`${ingredient} - ${measures[index]}` }
              </p>)) }
          </div>
        </div>
        <div className="instructions-main-container">
          <h3 className="instructions-title">Instructions</h3>
          <div className="instructions-container">
            <p
              data-testid="instructions"
              className="instructions"
            >
              { detailsData.strInstructions }
            </p>
          </div>
        </div>
      </section>
      <div className="status-btn-container">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="details-start-recipe"
          disabled={ (usedIngredients[recipeType] && usedIngredients[recipeType][id])
          && usedIngredients[recipeType][id].length !== ingredients.length }
          onClick={ () => handleClick({ id, type, key, detailsData, history }) }
        >
          Finish Recipe
        </button>
      </div>
    </main>
  );
}

export default RecipeInProgress;

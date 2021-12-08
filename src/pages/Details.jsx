import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchDrinkReq, fetchFoodReq } from '../services/APIs';
import RecommendationCarousel from './RecommendationCarousel';
import '../style/Details.css';
import RecipeStatusButton from '../components/RecipeStatusButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

const recipeTypeToggle = (type, param1, param2) => (type === 'meals' ? param1 : param2);

function Details() {
  const [detailsData, setDetailsData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const location = useLocation();
  const path = location.pathname;
  const id = path.split('s/')[1];
  const type = path.includes('comidas') ? 'meals' : 'drinks';
  const requisition = recipeTypeToggle(type, fetchFoodReq, fetchDrinkReq);
  const key = recipeTypeToggle(type, 'Meal', 'Drink');
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

  if (!detailsData || !ingredients) return <h3> Loading...</h3>;

  const youtubeEmbed = detailsData.strYoutube
    && detailsData.strYoutube.replace('watch?v=', 'embed/');

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
          <div className="recipe-title-container">
            <h3
              className="recipe-title"
              data-testid="recipe-title"
            >
              {detailsData[`str${key}`]}
            </h3>
          </div>
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
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="details-ingredient"
              >
                {`-${ingredient} - ${measures[index]}` }
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
        {
          key !== 'Drink' && (
            <div className="video-main-container">
              <h3 className="video-title">Video</h3>
              <div className="video-container">
                <iframe
                  title="myFrame"
                  width="420"
                  height="315"
                  src={ youtubeEmbed }
                  data-testid="video"
                />
              </div>
            </div>
          )
        }
      </section>
      <div className="carousel-container">
        <h3 className="carousel-title">Recommended</h3>
        <div className="carousel-container">
          <RecommendationCarousel type={ type } />
        </div>
      </div>
      <div className="status-btn-container">
        <RecipeStatusButton
          recipeId={ id }
          type={ type }
        />
      </div>
    </main>
  );
}

export default Details;

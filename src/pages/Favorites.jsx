import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';
import Context from '../context/Context';
import '../style/Favorites.css';

function Favorites() {
  const [category, setCategory] = useState('All');
  const { favoritesData } = useContext(Context);

  const favRecipesLocalStorage = localStorage.getObj('favoriteRecipes');
  const favoriteRecipes = !favoritesData.length
    ? favRecipesLocalStorage : favoritesData;

  const favorites = category === 'All'
    ? favoriteRecipes : favoriteRecipes.filter((recipe) => recipe.type === category);

  const favoriteButtons = [
    {
      name: 'All',
      testId: 'filter-by-all-btn',
      value: 'All',
    },
    {
      name: 'Food',
      testId: 'filter-by-food-btn',
      value: 'comida',
    },
    {
      name: 'Drinks',
      testId: 'filter-by-drink-btn',
      value: 'bebida',
    },
  ];

  return (
    <>
      <Header title="Favorite Recipes" />
      <div className="categories-btn-container">
        { favoriteButtons.map((button) => (
          <button
            type="button"
            key={ button.name }
            className="favorites-category-button"
            data-testid={ button.testId }
            value={ button.value }
            onClick={ () => setCategory(button.value) }
          >
            {button.name}
          </button>
        ))}
      </div>
      <div className="recipes-done-container">
        { favorites && favorites.map((recipe, index) => (
          <div key={ recipe.name } className="favorite-container done-recipe-card">
            <div className="done-recipe-img-container">
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  className="details-image-recipe-done"
                  src={ recipe.image }
                  alt="recipe"
                  data-testid={ `${index}-horizontal-image` }
                  width="320"
                  height="200"
                />
              </Link>
            </div>
            <div className="recipes-done-details-container">
              <div className="fav-recipe-category-container">
                <i
                  className="favorite-top-text"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.type === 'comida'
                    ? `${recipe.area} - ${recipe.category} `
                    : `${recipe.alcoholicOrNot} ` }
                </i>
              </div>
              <div className="fav-title-container">
                <p
                  className="fav-title"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </p>
              </div>
              <div className="fav-btns-container">
                <FavoriteButton
                  id={ recipe.id }
                  type={ recipe.type }
                  area={ recipe.area }
                  category={ recipe.category }
                  alcoholicOrNot={ recipe.alcoholicOrNot }
                  name={ recipe.name }
                  image={ recipe.image }
                  testId={ `${index}-horizontal-favorite-btn` }
                />
                <ShareButton
                  testId={ `${index}-horizontal-share-btn` }
                  route={ recipe.type === 'comida'
                    ? `/comidas/${recipe.id}` : `bebidas/${recipe.id}` }
                />
              </div>
            </div>
          </div>
        )) }
      </div>
    </>
  );
}

export default Favorites;

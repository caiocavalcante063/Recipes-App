import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../utils/index';
import ShareButton from '../components/ShareButton';
import '../style/RecipesMade.css';

function RecipesMade() {
  const [recipesToRender, setRecipesToRender] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const recipes = localStorage.getObj('doneRecipes');
    if (!recipes) localStorage.setObj('doneRecipes', []);
    if (filter === 'all') {
      setRecipesToRender(recipes);
    } else {
      const filteredRecipes = recipes.filter((recipe) => recipe.type === filter);
      setRecipesToRender(filteredRecipes);
    }
  }, [filter]);

  return (
    <>
      <Header title="Done Recipes" />
      <div>
        <div className="categories-btn-container">
          <button
            type="button"
            name="all"
            id="allID"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
          >
            All
          </button>
          <button
            type="button"
            name="food"
            id="foodID"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('comida') }
          >
            Food
          </button>
          <button
            type="button"
            name="drinks"
            id="drinksID"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('bebida') }
          >
            Drinks
          </button>
        </div>
        <div className="recipes-done-container">
          { (recipesToRender) && recipesToRender.map((objReceita, index) => (
            <div
              key={ objReceita.id }
              className="done-recipe-card"
            >
              <div className="done-recipe-img-container">
                <Link to={ `/${objReceita.type}s/${objReceita.id}` }>
                  <img
                    className="details-image-recipe-done"
                    src={ objReceita.image }
                    alt=""
                    data-testid={ `${index}-horizontal-image` }
                    width="320"
                    height="205"

                  />
                </Link>
              </div>
              <div className="recipes-done-details-container">
                <div className="tags-container">
                  {objReceita.tags.map((tags, indexx) => (
                    <div
                      data-testid={ `${index}-${tags}-horizontal-tag` }
                      key={ `${indexx} ${objReceita.id}` }
                      className="tags-card"
                    >
                      { tags
                      && (
                        <div className="tag-container">
                          {tags && (tags.includes(',') ? tags.split(',')[0]
                            : tags)}
                        </div>)}
                    </div>))}
                </div>
                <div className="done-recipe-category-container">
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {objReceita.area && `${objReceita.area} - ${objReceita.category}`}
                    {objReceita.alcoholicOrNot}
                  </p>
                </div>
                <div className="done-recipe-name-container">
                  <Link to={ `/${objReceita.type}s/${objReceita.id}` }>
                    <p
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {objReceita.name}
                    </p>
                  </Link>
                </div>
                <div className="done-recipe-date-container">
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    {`Done in: ${objReceita.doneDate}`}
                  </p>
                </div>
                <div className="done-recipe-share-btn-container">
                  <ShareButton
                    testId={ `${index}-horizontal-share-btn` }
                    route={ `/${objReceita.type}s/${objReceita.id}` }
                  />
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </>
  );
}

export default RecipesMade;

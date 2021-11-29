import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinkButton from '../components/LinkButton';
import { fetchRandomRecipe } from '../services/APIs';
import '../style/Explore.css';

function ExploreFood() {
  const history = useHistory();
  const randomRecipe = async () => {
    const randomId = (await fetchRandomRecipe('comidas')).meals[0].idMeal;
    history.push(`/comidas/${randomId}`);
  };
  return (
    <div>
      <Header title="Explore Foods" />
      <div className="explore-details-container">
        <LinkButton
          text="By Ingredient"
          testid="explore-by-ingredient"
          linkTo="/explorar/comidas/ingredientes"
          className="explore-details-btn"
        />
        <LinkButton
          text="By Location of Origin"
          testid="explore-by-area"
          linkTo="/explorar/comidas/area"
          className="explore-details-btn"
        />
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ randomRecipe }
          className="explore-details-btn"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFood;

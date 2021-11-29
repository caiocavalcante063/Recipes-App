import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinkButton from '../components/LinkButton';
import { fetchRandomRecipe } from '../services/APIs';
import '../style/Explore.css';

function ExploreDrink() {
  const history = useHistory();
  const randomRecipe = async () => {
    const randomId = (await fetchRandomRecipe('bebidas')).drinks[0].idDrink;
    history.push(`/bebidas/${randomId}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" />
      <div className="explore-details-container">
        <LinkButton
          text="By Ingredient"
          testid="explore-by-ingredient"
          linkTo="/explorar/bebidas/ingredientes"
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

export default ExploreDrink;

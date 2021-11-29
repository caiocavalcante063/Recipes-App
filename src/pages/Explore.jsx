import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinkButton from '../components/LinkButton';
import '../style/Explore.css';

function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <div id="explore-foods-container">
        <LinkButton
          id="explore-foods-btn"
          text="Explore Foods"
          linkTo="/explorar/comidas"
          testid="explore-food"
        />
      </div>
      <div id="explore-drinks-container">
        <LinkButton
          id="explore-drinks-btn"
          text="Explore Drinks"
          linkTo="/explorar/bebidas"
          testid="explore-drinks"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Explore;

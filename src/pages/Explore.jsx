import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinkButton from '../components/LinkButton';

function Explore() {
  return (
    <div>
      <Header title="Explore" />
      <div>
        <LinkButton
          text="Explore Foods"
          linkTo="/explorar/comidas"
          testid="explore-food"
        />

        <LinkButton
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

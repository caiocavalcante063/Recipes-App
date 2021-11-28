import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import PropTypes from 'prop-types';

function Perfil() {
  const userEmail = localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user')).email : 'email';
  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{ userEmail }</h2>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Recipes Done
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;

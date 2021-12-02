import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Profile.css';

function Perfil() {
  const userEmail = localStorage.getItem('user') !== null
    ? JSON.parse(localStorage.getItem('user')).email : 'email';
  return (
    <div>
      <Header title="Profile" />
      <div className="profile-container">
        <span data-testid="profile-email" className="profile-email">{ userEmail }</span>
        <div className="profile-btn-container">
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="profile-done-btn"
              className="profile-btn"
            >
              Recipes Done
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              data-testid="profile-favorite-btn"
              className="profile-btn"
            >
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
              className="profile-btn"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../utils/index';
import '../style/Header.css';

const classNameHandler = (path) => {
  if ((path.includes('/perfil') || path.includes('/explorar')
  || path.includes('/receitas')) && !path.includes('area')) {
    return 'header-explore';
  }
  return 'header-container';
};

export default function Header({ title }) {
  const [redirect, setRedirect] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (title.includes('Explorar')) setIsExploring(true);
    if (title.includes('Receitas')) setIsExploring(true);
    if (title.includes('Perfil')) setIsExploring(true);
    if (title.includes('Origem')) setIsExploring(false);
  }, [title]);

  if (redirect) return <Redirect to="/perfil" />;

  return (
    <header className={ classNameHandler(path) }>
      <button
        type="button"
        onClick={ () => setRedirect(true) }
        id="profile-btn"
        className={ classNameHandler(path) }
      >
        <img
          src={ profileIcon }
          alt="Perfil"
          data-testid="profile-top-btn"
          className="header-icons"
        />
      </button>

      <p
        data-testid="page-title"
        id="page-title"
      >
        {title}
      </p>

      {!isExploring
        && (
          <button
            type="button"
            id="search-btn"
            className={ classNameHandler(path) }
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img
              src={ searchIcon }
              alt="Buscar"
              data-testid="search-top-btn"
              className="header-icons"
            />
          </button>)}

      {
        searchBar && (
          <SearchBar
            title={ title }
          />)
      }

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

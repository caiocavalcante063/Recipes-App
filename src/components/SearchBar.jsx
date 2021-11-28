import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Context from '../context/Context';
import { fetchDrinkReq, fetchFoodReq } from '../services/APIs';

export default function SearchBar({ title }) {
  const [type, setType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [checkValue, setCheckValue] = useState('');
  const history = useHistory();
  const { setSearchData } = useContext(Context);

  const handleSearch = async (typeSelected, option, search) => {
    if (title === 'Comidas') {
      const data = await fetchFoodReq(typeSelected, option, search);
      if (!data.meals) {
        return global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      setSearchData(data.meals);
      if (data.meals.length === 1) {
        history.push(`/comidas/${data.meals[0].idMeal}`);
      }
    }
    if (title === 'Bebidas') {
      const data = await fetchDrinkReq(typeSelected, option, search);
      if (!data.drinks) {
        return global
          .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
      setSearchData(data.drinks);
      if (data.drinks.length === 1) {
        history.push(`/bebidas/${data.drinks[0].idDrink}`);
      }
    }
  };

  const searchRecipes = ({ target }, option) => {
    const text = target.value;
    if (option === 'f' && text.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setSearchText(target.value);
  };

  return (
    <form id="searchBar-form">
      <input
        type="text"
        onChange={ (e) => searchRecipes(e, checkValue) }
        value={ searchText }
        data-testid="search-input"
        id="search-input"
        placeholder="Search Recipe"
      />
      <div
        onChange={ (e) => setCheckValue(e.target.value) }
        id="search-radio-container"
      >
        <label htmlFor="ingredientID" className="radio-search-label">
          <input
            type="radio"
            value="i"
            name="searchBar"
            className="radio-search"
            onClick={ () => setType('filter') }
            id="ingredientID"
            data-testid="ingredient-search-radio"
          />
          {' '}
          Ingredient
        </label>
        <label htmlFor="nameID" className="radio-search-label">

          <input
            type="radio"
            value="s"
            name="searchBar"
            className="radio-search"
            onClick={ () => setType('search') }
            id="nameID"
            data-testid="name-search-radio"
          />
          {' '}
          Name
        </label>
        <label htmlFor="firstID" className="radio-search-label">
          <input
            type="radio"
            value="f"
            name="searchBar"
            className="radio-search"
            onClick={ () => setType('search') }
            id="firstID"
            data-testid="first-letter-search-radio"
          />
          {' '}
          First Letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        id="searchbar-btn"
        onClick={ () => handleSearch(type, checkValue, searchText) }
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

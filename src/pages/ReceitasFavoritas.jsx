import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { clickShare } from '../services/functionsForDetails';
import '../css/ReceitasFavoritas.css';

const INTERVAL = 3000;

export default function ReceitasFavoritas() {
  const [copyOk, setCopyOk] = useState(false);
  const [favoritesFromStorage, setFavoritesFromStorage] = useState([]);

  const onClickFilter = (type) => {
    const arrayFromStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    switch (type) {
    case 'All':
      setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
      break;
    case 'Food':
      setFavoritesFromStorage(arrayFromStorage.filter((food) => food.type === 'comida'));
      break;
    case 'Drinks':
      setFavoritesFromStorage(arrayFromStorage
        .filter((drink) => drink.type === 'bebida'));
      break;
    default:
      setFavoritesFromStorage(favoritesFromStorage);
    }
  };

  const buttonsFilters = () => (
    <div className="category-body">
      <Button
        text="All"
        dataTest="filter-by-all-btn"
        onClick={ () => onClickFilter('All') }
      />
      <Button
        text="Food"
        dataTest="filter-by-food-btn"
        onClick={ () => onClickFilter('Food') }
      />
      <Button
        text="Drinks"
        dataTest="filter-by-drink-btn"
        onClick={ () => onClickFilter('Drinks') }
      />
    </div>
  );

  useEffect(() => {
    // chamar a função de cronometro
    if (copyOk) {
      const intervalId = setInterval(() => { setCopyOk(false); }, INTERVAL);
      return () => { clearInterval(intervalId); };
    }
  }, [copyOk]);

  useEffect(() => {
    setFavoritesFromStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  const clickFavoriteButton = (Id) => {
    const favoriteStorage = localStorage.getItem('favoriteRecipes');
    const favoritesObj = JSON.parse(favoriteStorage);
    const newFavorite = favoritesObj.filter((element) => element.id !== Id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setFavoritesFromStorage(newFavorite);
  };
  return (
    <main className="main-content">
      <Header pageTitle="Receitas Favoritas" searchButton={ false } />
      {buttonsFilters()}
      <div className="recipes-done-cards">
        {favoritesFromStorage !== null && favoritesFromStorage.map((recipes, index) => (
          <div className="recipes-done-card" key={ index }>
            <Link
              to={ recipes.type === 'comida'
                ? `/comidas/${recipes.id}` : `/bebidas/${recipes.id}` }
            >
              <img
                className="recipes-done-card-img"
                data-testid={ `${index}-horizontal-image` }
                src={ recipes.image }
                alt={ `Foto ${recipes.name}` }
              />
            </Link>
            <div>
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipes.type === 'bebida' ? recipes.alcoholicOrNot
                  : `${recipes.area} - ${recipes.category}`}
              </h5>
              <Link
                to={ recipes.type === 'comida'
                  ? `/comidas/${recipes.id}` : `/bebidas/${recipes.id}` }
              >
                <h4 data-testid={ `${index}-horizontal-name` }>{ recipes.name }</h4>
              </Link>

              <button
                className="favorite-button"
                type="button"
                onClick={ () => clickShare(setCopyOk, recipes.type, recipes.id) }
              >
                <img
                  className="recipes-done-card-share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Compartilhar"
                />
              </button>
              <button
                className="favorite-button"
                type="button"
                onClick={ () => clickFavoriteButton(recipes.id) }
              >
                <img
                  className="recipes-done-card-share"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorito"
                />
              </button>

            </div>
          </div>
        ))}
      </div>
      { copyOk && <div className="alert-mensage">Link copiado!</div> }
    </main>
  );
}

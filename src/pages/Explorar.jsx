import React from 'react';
import { useHistory } from 'react-router-dom';
// import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Explorar() {
  const history = useHistory();

  function getFood() {
    const redirect = '/explorar/comidas';
    history.push(redirect);
  }

  function getDrinks() {
    const redirect = '/explorar/bebidas';
    history.push(redirect);
  }
  return (
    <main className="main-content">
      <Header pageTitle="Explorar" searchButton={ false } />
      <div className="recipes-done-cards">
        <button
          className="explore-form-button"
          onClick={ getFood }
          data-testid="explore-food"
          type="button"
        >
          <img src={ mealIcon } alt="meal-icon" />
          Explorar Comidas
        </button>
        <button
          className="explore-form-button"
          onClick={ getDrinks }
          data-testid="explore-drinks"
          type="button"
        >
          <img src={ drinkIcon } alt="drink-icon" />
          Explorar Bebidas
        </button>
      </div>
      {/* <Button
        text="Explorar Comidas"
        dataTest="explore-food"
        onClick={ getFood }
      />
      <Button
        text="Explorar Bebidas"
        dataTest="explore-drinks"
        onClick={ getDrinks }
      /> */}
      <Footer />
    </main>
  );
}

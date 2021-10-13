import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
// import ButtonExplorer from '../components/ButtonExplorer';
import Footer from '../components/Footer';
import { getMealSurprise } from '../services/fetchRadioComidas';

import expIngIcon from '../images/ingredientes.png';
import expLocalIcon from '../images/globo.png';
import expSurpIcon from '../images/surpresa.png';

export default function ExplorarComidas() {
  const history = useHistory();

  function redirectExplorerByIngredient() {
    const redirect = '/explorar/comidas/ingredientes';
    history.push(redirect);
  }

  function redirectExplorerByArea() {
    const redirect = '/explorar/comidas/area';
    history.push(redirect);
  }

  async function redirectSurprise() {
    const mealSurprise = await getMealSurprise();
    const redirect = `/comidas/${mealSurprise[0].idMeal}`;
    history.push(redirect);
  }

  return (
    <main className="main-content">
      <Header pageTitle="Explorar Comidas" searchButton={ false } />

      <div className="recipes-done-cards">
        <button
          className="explore-form-button"
          onClick={ redirectExplorerByIngredient }
          data-testid="explore-by-ingredient"
          type="button"
        >
          <img src={ expIngIcon } alt="Ingredientes icon" />
          Por Ingredientes
        </button>
        <button
          className="explore-form-button"
          onClick={ redirectExplorerByArea }
          data-testid="explore-by-area"
          type="button"
        >
          <img src={ expLocalIcon } alt="Local icon" />
          Por Local de Origem
        </button>
        <button
          className="explore-form-button"
          onClick={ redirectSurprise }
          data-testid="explore-surprise"
          type="button"
        >
          <img src={ expSurpIcon } alt="Surpreenda icon" />
          Me Surpreenda!
        </button>
      </div>

      {/* <ButtonExplorer
        id="by-ingredient"
        dataTest="explore-by-ingredient"
        className="button-explorer"
        text="Por Ingredientes"
        onClick={ redirectExplorerByIngredient }
      />

      <ButtonExplorer
        id="by-area"
        dataTest="explore-by-area"
        className="button-explorer"
        text="Por Local de Origem"
        onClick={ redirectExplorerByArea }
      />

      <ButtonExplorer
        id="surprise"
        dataTest="explore-surprise"
        className="button-explorer"
        text="Me Surpreenda!"
        onClick={ redirectSurprise }
      /> */}

      <Footer />
    </main>
  );
}

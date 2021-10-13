import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import fetchIdComidas from '../services/fetchIdComidas';
import { fetchRecomendationsDrinks } from '../services/fetchIdBebidas';
import getSixCards, { ChoiceButton,
  getEmbedVideo, getIngredient,
  getMeasure } from '../services/functionsForDetails';
import '../css/CardsRecomendations.css';
import ShareAndFavButton from '../components/ShareAndFavButton';
import { modifyMealRecipeInfo } from '../GlobalFuncs/modifyRecipeInfo';
import '../css/Detalhes.css';
import '../css/RecipeInProgress.css';
import Loading from '../components/Loading';

function DetalhesComidas({ match: { params: { id } } }) {
  const [objIdReceita, setObjIdReceita] = useState();
  const [objRecomendations, setObjRecomendados] = useState();
  const { push } = useHistory();

  const fetchId = useCallback(async () => {
    setObjIdReceita(await fetchIdComidas(id));
    setObjRecomendados(await fetchRecomendationsDrinks());
  }, [id]);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  const inFButton = {
    id,
    tipo: 'comidas',
  };

  const getIngredientAndMeasure = () => {
    const array = [];
    if (getMeasure(objIdReceita, 'comida') !== undefined
      && getIngredient(objIdReceita, 'comidas') !== undefined) {
      const measure = getMeasure(objIdReceita, 'comida');
      const ingredient = getIngredient(objIdReceita, 'comidas');
      const mix = [{
        ingredient,
        measure,
      }];
      for (let i = 0; i < mix[0].ingredient.length; i += 1) {
        array.push(`${mix[0].ingredient[i]}-${mix[0].measure[i]}`);
      }
      return array;
    }
  };

  if (objIdReceita === undefined) {
    return <Loading />;
  }

  return (
    <main className="recipe-in-progress-main">
      <header className="in-progress-header">
        <img
          src={ objIdReceita.strMealThumb }
          data-testid="recipe-photo"
          alt="recipeFoto"
          // className="imgDetalhes"
        />
      </header>
      <section className="in-progress-title-section">
        <div>
          <h2 data-testid="recipe-title">{objIdReceita.strMeal}</h2>
          <h5 data-testid="recipe-category">{objIdReceita.strCategory}</h5>
        </div>
        <ShareAndFavButton recipeInfos={ modifyMealRecipeInfo(objIdReceita) } />
      </section>
      <section className="ingredients-section">
        <h2>Ingredients:</h2>
        <ul>
          {getIngredientAndMeasure().map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>
          ))}
        </ul>
      </section>
      <section className="insrtuctions-section">
        <h2>Instructions:</h2>
        <p data-testid="instructions">
          {objIdReceita.strInstructions}
        </p>
      </section>
      <section>
        <iframe
          title="dsa"
          frameBorder="0"
          data-testid="video"
          // width="300px"
          src={ getEmbedVideo(objIdReceita) }
          className="video"
        />
      </section>
      <div className="cardsRecomendations">
        {getSixCards(objRecomendations) !== undefined && getSixCards(objRecomendations)
          .map((element, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
              className="card-body-recipies"
            >
              <img
                // style={ { width: '180px' } }
                src={ element.strDrinkThumb }
                alt="imag"
              />
              <h4 data-testid={ `${index}-recomendation-title` }>{element.strDrink}</h4>
            </div>
          ))}
      </div>
      {/* <div className="cardsRecomendations">
        {getSixCards(objRecomendations) !== undefined && getSixCards(objRecomendations)
          .map((element, index) => (
            <div data-testid={ `${index}-recomendation-card` } key={ index }>
              <img
                style={ { width: '180px' } }
                src={ element.strDrinkThumb }
                alt="imag"
              />
              <p data-testid={ `${index}-recomendation-title` }>{element.strDrink}</p>
            </div>
          ))}
      </div> */}
      {ChoiceButton(inFButton, push)}
    </main>
  );
}

DetalhesComidas.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default DetalhesComidas;

import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import fetchIdBebidas from '../services/fetchIdBebidas';
import getSixCards, { ChoiceButton,
  getMeasure, getIngredient } from '../services/functionsForDetails';
import { fetchRecomendationsMeals } from '../services/fetchIdComidas';
import '../css/CardsRecomendations.css';
import ShareAndFavButton from '../components/ShareAndFavButton';
import { modifyDrinkRecipeInfo } from '../GlobalFuncs/modifyRecipeInfo';
import '../css/Detalhes.css';
import '../css/RecipeInProgress.css';
import Loading from '../components/Loading';

function DetalhesBebidas({ match: { params: { id } } }) {
  const [objIdReceita, setObjIdReceita] = useState();
  const [recomendations, setObjRecomentations] = useState();
  const { push } = useHistory();
  const fetchId = useCallback(async () => {
    setObjIdReceita(await fetchIdBebidas(id));
    setObjRecomentations(await fetchRecomendationsMeals());
  }, [id]);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  const inFButton = {
    id,
    tipo: 'bebidas',
  };

  const getIngredientAndMeasure = () => {
    const array = [];
    if (getMeasure(objIdReceita, 'bebida') !== undefined
    && getIngredient(objIdReceita, 'bebidas') !== undefined) {
      const measure = getMeasure(objIdReceita, 'bebida');
      const ingredient = getIngredient(objIdReceita, 'bebidas');
      const mix = [{
        ingredient,
        measure,
      }];
      for (let i = 0; i < mix[0].ingredient.length; i += 1) {
        array.push(`${mix[0].ingredient[i]} - ${mix[0].measure[i]}`);
      }
      if (array.some((element) => element.includes('undefined'))) {
        const withOutUndefined = array.map((element) => {
          const beatifulDrinks = element.replace(' - undefined', '');
          return beatifulDrinks;
        });
        return withOutUndefined;
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
          src={ objIdReceita.strDrinkThumb }
          data-testid="recipe-photo"
          alt="recipeFoto"
          // className="imgDetalhes"
        />
      </header>
      <section className="in-progress-title-section">
        <div>
          <h2 data-testid="recipe-title">{objIdReceita.strDrink}</h2>
          <h5 data-testid="recipe-category">{objIdReceita.strAlcoholic}</h5>
        </div>
        <ShareAndFavButton recipeInfos={ modifyDrinkRecipeInfo(objIdReceita) } />
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
        <p data-testid="video" />
      </section>
      <div className="cardsRecomendations">
        {getSixCards(recomendations) !== undefined && getSixCards(recomendations)
          .map((element, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
              className="card-body-recipies"
            >
              <img
                // style={ { width: '180px' } }
                src={ element.strMealThumb }
                alt="imag"
              />
              <h4 data-testid={ `${index}-recomendation-title` }>{element.strMeal}</h4>
            </div>
          ))}
      </div>
      {ChoiceButton(inFButton, push)}
    </main>
    // <div className="divDetalhes">
    //   <img
    //     width="300px"
    //     data-testid="recipe-photo"
    //     src={ objIdReceita.strDrinkThumb }
    //     alt="recipeFoto"
    //     className="imgDetalhes"
    //   />
    //   <h1
    //     className="recipeTitle"
    //     data-testid="recipe-title"
    //   >
    //     { objIdReceita.strDrink }
    //   </h1>
    //   <div className="btnFav">
    //     <ShareAndFavButton recipeInfos={ modifyDrinkRecipeInfo(objIdReceita) } />
    //   </div>
    //   <p className="alc" data-testid="recipe-category">{objIdReceita.strAlcoholic}</p>
    //   <section className="ingredients">
    //     <p>Ingredients:</p>
    //     {getIngredientAndMeasure().map((element, index) => (
    //       <div key={ index }>
    //         <p data-testid={ `${index}-ingredient-name-and-measure` }>{element}</p>
    //       </div>
    //     ))}
    //   </section>
    //   <p>Instructions:</p>
    //   <p
    //     className="pInstruction"
    //     data-testid="instructions"
    //   >
    //     { objIdReceita.strInstructions }
    //   </p>
    //   <p data-testid="video" />
    //   <div className="cardsRecomendations">
    //     {getSixCards(recomendations) !== undefined && getSixCards(recomendations)
    //       .map((element, index) => (
    //         <div data-testid={ `${index}-recomendation-card` } key={ index }>
    //           <img style={ { width: '180px' } } src={ element.strMealThumb } alt="imag" />
    //           <p data-testid={ `${index}-recomendation-title` }>{element.strMeal}</p>
    //         </div>
    //       ))}
    //   </div>
    //   {ChoiceButton(inFButton, push)}
    // </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default DetalhesBebidas;

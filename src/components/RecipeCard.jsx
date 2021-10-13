import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

const INTERVAL = 3000;
const copy = require('clipboard-copy');

function RecipeCard({ recipe, index }) {
  const [isCopyClipboard, setIsCopyClipboard] = useState(false);
  const {
    id, type, alcoholicOrNot, area, category, name, image, doneDate, tags,
  } = recipe;

  useEffect(() => {
    // chamar a função de cronometro
    if (isCopyClipboard) {
      const intervalId = setInterval(() => { setIsCopyClipboard(false); }, INTERVAL);
      return () => { clearInterval(intervalId); };
    }
  }, [isCopyClipboard]);

  // https://www.devmedia.com.br/javascript-get-url/28531
  const url = `${window.location.protocol}//${window.location.host}`;

  function getCopyClipboard() {
    setIsCopyClipboard(true);
    return (
      copy(type === 'comida'
        ? `${url}/comidas/${id}` : `${url}/bebidas/${id}`)
    );
  }

  return (
    <div className="recipes-done-card">
      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <img
          className="recipes-done-card-img"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ `Foto ${name}` }
        />
      </Link>
      <div>
        <h5
          data-testid={ `${index}-horizontal-top-text` }
        >
          { type === 'bebida' && alcoholicOrNot }
          { type === 'comida' && `${area} - ${category}` }
        </h5>
        <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
        <p>
          { 'Feita em: ' }
          <span data-testid={ `${index}-horizontal-done-date` }>
            { doneDate }
          </span>
        </p>
        <button
          type="button"
          onClick={
            () => getCopyClipboard()
          }
        >
          <img
            className="recipes-done-card-share"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Compartilhar"
          />
        </button>
        { type === 'comida' && (
          <div className="recipes-done-tags">
            {tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </span>
            ))}
          </div>) }
      </div>
      { isCopyClipboard && <div className="alert-mensage">Link copiado!</div> }
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;

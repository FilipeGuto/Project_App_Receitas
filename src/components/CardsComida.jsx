import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardsComida({ comidas }) {
  return (
    <div className="cards">
      {comidas.map((comida, index) => (
        <Link
          to={ `/comidas/${comida.idMeal}` }
          key={ index }
        >
          <div
            data-testid={ `${index}-recipe-card` }
            className="card-body-recipies"
          >
            <img
              data-testid={ `${index}-card-img` }
              alt={ `Foto ${comida.strMeal}` }
              src={ comida.strMealThumb }
            />
            <div>
              <h4 data-testid={ `${index}-card-name` }>{comida.strMeal}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

CardsComida.propTypes = {
  comidas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardsComida;

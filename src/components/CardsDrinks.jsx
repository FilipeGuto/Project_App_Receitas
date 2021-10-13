import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function CardsDrinks({ drinks }) {
  return (
    <div className="cards">
      {drinks.map((drink, index) => (
        <Link
          to={ `/bebidas/${drink.idDrink}` }
          key={ index }
        >
          <div
            data-testid={ `${index}-recipe-card` }
            className="card-body-recipies"
          >
            <img
              data-testid={ `${index}-card-img` }
              alt={ `Foto ${drink.strDrink}` }
              src={ drink.strDrinkThumb }
            />
            <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
}

CardsDrinks.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CardsDrinks;

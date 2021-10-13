import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="app-footer">
      <button
        onClick={ () => history.push('/bebidas') }
        data-testid="drinks-bottom-btn"
        type="button"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink-icon" />
      </button>

      <button
        onClick={ () => history.push('/explorar') }
        data-testid="explore-bottom-btn"
        type="button"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore-icon" />
      </button>

      <button
        onClick={ () => history.push('/comidas') }
        data-testid="food-bottom-btn"
        type="button"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="explore-icon" />
      </button>
    </footer>
  );
}

export default Footer;

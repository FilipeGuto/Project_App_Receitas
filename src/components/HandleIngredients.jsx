import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../css/RecipeInProgress.css';

function HandleIngredients({ recipeInfos: { ingredients, measure, id, type },
  checkFinishCondition }) {
  const [ingredientsStatus, setingredientsStatus] = useState({});

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id]) {
      setingredientsStatus(JSON
        .parse(localStorage.getItem('inProgressRecipes'))[type][id]);
    }
  }, [id, type]);

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...currentStorage,
      [type]: {
        ...currentStorage[type],
        [id]: { ...ingredientsStatus },
      },
    }));
    checkFinishCondition(ingredientsStatus);
  }, [ingredientsStatus, id, type, ingredients, checkFinishCondition]);

  const handleCheckBox = ({ target: { id: elementID } }) => {
    if (ingredientsStatus[elementID]) {
      setingredientsStatus({
        ...ingredientsStatus,
        [elementID]: false,
      });
    } else {
      setingredientsStatus({
        ...ingredientsStatus,
        [elementID]: true,
      });
    }
  };

  return (
    <section className="ingredients-section">
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingrdient, index) => (
          <label
            key={ index }
            htmlFor={ `${index}-ingredient-step` }
            data-testid={ `${index}-ingredient-step` }
            className={ ingredientsStatus[`${index}-ingredient-step`] ? 'marked' : '' }
          >
            <input
              id={ `${index}-ingredient-step` }
              type="checkbox"
              onClick={ handleCheckBox }
              defaultChecked={ ingredientsStatus[`${index}-ingredient-step`] }
            />
            { `${ingrdient} - ${measure[index]}` }
          </label>
        ))}
      </ul>
    </section>
  );
}

HandleIngredients.propTypes = {
  recipeInfos: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measure: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  checkFinishCondition: PropTypes.func.isRequired,
};

export default HandleIngredients;

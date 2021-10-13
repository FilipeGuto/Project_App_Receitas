import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressRecipe from '../components/ProgressRecipe';
import fetchIdComidas from '../services/fetchIdComidas';
import { modifyMealRecipeInfo } from '../GlobalFuncs/modifyRecipeInfo';
import '../css/RecipeInProgress.css';
import Loading from '../components/Loading';

function ProgressoComida({ match: { params: { id } } }) {
  const [recipeInfo, setRecipeInfo] = useState(undefined);

  const fetchId = useCallback(async () => {
    setRecipeInfo(await fetchIdComidas(id));
  }, [id]);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  if (recipeInfo === undefined) {
    return <Loading />;
  }

  return (
    <main className="recipe-in-progress-main">
      <ProgressRecipe recipe={ modifyMealRecipeInfo(recipeInfo) } />
    </main>
  );
}

ProgressoComida.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ProgressoComida;

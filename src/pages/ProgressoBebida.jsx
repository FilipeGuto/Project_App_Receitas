import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProgressRecipe from '../components/ProgressRecipe';
import fetchIdBebidas from '../services/fetchIdBebidas';
import { modifyDrinkRecipeInfo } from '../GlobalFuncs/modifyRecipeInfo';
import '../css/RecipeInProgress.css';
import Loading from '../components/Loading';

function ProgressoBebida({ match: { params: { id } } }) {
  const [recipeInfo, setRecipeInfo] = useState(undefined);

  const fetchId = useCallback(async () => {
    setRecipeInfo(await fetchIdBebidas(id));
  }, [id]);

  useEffect(() => {
    fetchId();
  }, [fetchId]);

  if (recipeInfo === undefined) {
    return <Loading />;
  }

  return (
    <main className="recipe-in-progress-main">
      <ProgressRecipe recipe={ modifyDrinkRecipeInfo(recipeInfo) } />
    </main>
  );
}

ProgressoBebida.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ProgressoBebida;

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

import RecipeCard from '../components/RecipeCard';
import Button from '../components/Button';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterDoneRecipes, setFilterDoneRecipes] = useState('');

  function getDoneRecipesByLocalStorage() {
    return JSON.parse(localStorage.getItem('doneRecipes'));
  }

  useEffect(() => {
    setDoneRecipes(getDoneRecipesByLocalStorage());
  }, []);

  function getFilterDoneRecipes(recipes) {
    return (
      recipes
        .filter((recipe) => (
          filterDoneRecipes !== '' ? recipe.type === filterDoneRecipes : recipe))
    );
  }

  return (
    <main className="main-content">
      <Header pageTitle="Receitas Feitas" searchButton={ false } />
      <div className="category-body">
        <Button
          text="All"
          onClick={ () => setFilterDoneRecipes('') }
          dataTest="filter-by-all-btn"
        />
        <Button
          text="Food"
          onClick={ () => setFilterDoneRecipes('comida') }
          dataTest="filter-by-food-btn"
        />
        <Button
          text="Drinks"
          onClick={ () => setFilterDoneRecipes('bebida') }
          dataTest="filter-by-drink-btn"
        />
      </div>
      <div className="recipes-done-cards">
        { doneRecipes !== 0
          && getFilterDoneRecipes(doneRecipes)
            .map(
              (recipe, index) => (
                <RecipeCard key={ index } recipe={ recipe } index={ index } />),
            )}
      </div>
    </main>
  );
}

export default ReceitasFeitas;

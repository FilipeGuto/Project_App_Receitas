export function getDate() {
  const time = new Date();
  return (`${time.getDate()}/0${time.getMonth()}/${time.getFullYear()}`);
}

function removeInProgress(id, recipeType) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  delete inProgressRecipes[recipeType][id];
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

export function finishRecipe(newDoneRecipe, recipeType) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const newDoneRecipes = doneRecipes.filter((recipe) => recipe.id !== newDoneRecipe.id);
  localStorage.setItem('doneRecipes', JSON.stringify([...newDoneRecipes, newDoneRecipe]));
  removeInProgress(newDoneRecipe.id, recipeType);
}

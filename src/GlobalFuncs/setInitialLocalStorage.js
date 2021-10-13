const RECIPES_IN_PROGRESS = localStorage.getItem('inProgressRecipes');
const FAVORITES = localStorage.getItem('favoriteRecipes');
const DONE_RECIPES = localStorage.getItem('doneRecipes');

export default function SetInitialLocalStorage() {
  if (!RECIPES_IN_PROGRESS) {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {},
      cocktails: {},
      ...inProgressRecipes,
    }));
  }

  if (!FAVORITES) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }

  if (!DONE_RECIPES) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
}

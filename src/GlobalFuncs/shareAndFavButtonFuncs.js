export function shareButtonFunc(url) {
  navigator.clipboard.writeText(url);
  // Referência do navigator:
  // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
}

function removeFavorite(recipe, favorites) {
  const newFavorites = favorites.filter((favorite) => favorite.id !== recipe.id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
}

function addFavorite(recipe, favorites) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, recipe]));
}

export function setFavorites(recipe) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites.some((favorite) => favorite.id === recipe.id)) {
    removeFavorite(recipe, favorites);
  } else {
    addFavorite(recipe, favorites);
  }
}

export function checkFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorites.some((item) => item.id === id)) {
    return (true);
  }
  return false;
}

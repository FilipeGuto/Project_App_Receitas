const LIMIT = 20;

export function getIngredients(recipe) {
  let ingredients = [];

  for (let index = 1; index <= LIMIT; index += 1) {
    const position = `strIngredient${index}`;
    if (recipe[position] !== null && recipe[position] !== ''
      && recipe[position] !== ' ' && recipe[position]) {
      ingredients = [...ingredients, recipe[position]];
    }
  }
  return ingredients;
}

export function getMeasure(recipe) {
  let measure = [];

  for (let index = 1; index <= LIMIT; index += 1) {
    const position = `strMeasure${index}`;
    if (recipe[position] !== null && recipe[position] !== ''
      && recipe[position] !== ' ' && recipe[position]) {
      measure = [...measure, recipe[position]];
    }
  }
  return measure;
}

import { getIngredients, getMeasure } from './getIngredientsAndMeasure';

export function modifyMealRecipeInfo(recipeInfo) {
  const { strMeal,
    strMealThumb, strCategory, strInstructions, idMeal, strArea, strTags } = recipeInfo;
  return {
    image: strMealThumb,
    title: strMeal,
    category: strCategory,
    instructions: strInstructions,
    area: strArea,
    alcoholic: '',
    ingredients: getIngredients(recipeInfo),
    measure: getMeasure(recipeInfo),
    id: idMeal,
    type: 'meals',
    tipo: 'comida',
    tags: strTags,
  };
}

export function modifyDrinkRecipeInfo(recipeInfo) {
  const { strDrinkThumb, strDrink,
    strCategory, strInstructions, idDrink, strAlcoholic, strTags } = recipeInfo;
  return {
    image: strDrinkThumb,
    title: strDrink,
    category: strCategory,
    area: '',
    alcoholic: strAlcoholic,
    instructions: strInstructions,
    ingredients: getIngredients(recipeInfo),
    measure: getMeasure(recipeInfo),
    id: idDrink,
    type: 'cocktails',
    tipo: 'bebida',
    tags: strTags,
  };
}

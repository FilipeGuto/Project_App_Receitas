const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const QUANTIDADE_INGREDIENTS = 12;

export const fetchMealIngredientsList = async () => {
  const response = await fetch(MEAL_URL);
  const data = await response.json();
  return data.meals.slice(0, QUANTIDADE_INGREDIENTS);
};

export const fetchDrinkIngredientsList = async () => {
  const response = await fetch(DRINK_URL);
  const data = await response.json();
  return data.drinks.slice(0, QUANTIDADE_INGREDIENTS);
};

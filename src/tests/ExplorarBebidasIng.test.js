import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import ingredientsList, { filterByIngredientMock } from './support/IngredientsList';
import App from '../App';
import * as fetchs from '../services/fetchRadioBebidas';
// Referencia de como mockar uma funçao read-only:
// https://medium.com/@chris.marshall/mocking-read-only-functions-which-return-functions-in-jest-enzyme-4d2f2a97c168

const { drinks } = ingredientsList;
const { drinksList } = filterByIngredientMock;
const URL = '/explorar/bebidas/ingredientes';
const RECIPE_LIMIT = 2;
const INGREDIENT_LIMIT = 12;
const INGREDIENT_CARD = /-ingredient-card/;
const INGREDIENT_IMG = /-card-img/;
const INGREDIENT_NAME = /-card-name/;
let HISTORY;

describe('Explore by Ingredients tests', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ drinks }),
    }));

    await act(async () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        initialEntries: [URL],
      });
      HISTORY = history;
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('Se os ingredientes estão sendo renderizados ', async () => {
    const cards = await screen.findAllByTestId(INGREDIENT_CARD);
    const Image = await screen.findAllByTestId(INGREDIENT_IMG);
    const names = await screen.findAllByTestId(INGREDIENT_NAME);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(cards).toHaveLength(INGREDIENT_LIMIT);
    expect(Image).toHaveLength(INGREDIENT_LIMIT);
    expect(names).toHaveLength(INGREDIENT_LIMIT);

    cards.forEach((card, index) => {
      expect(card).toBeInTheDocument();
      expect(Image[index]).toBeInTheDocument();
      expect(Image[index].src)
        .toContain(drinks[index].strIngredient1.replace(/ /g, '%20'));
      expect(names[index]).toBeInTheDocument();
      expect(names[index].innerHTML).toBe(drinks[index].strIngredient1);
    });
  });

  test('As funcionalidas ao clicar no ingrediente', async () => {
    fetchs.fetchIngredienteBeb = jest.fn(() => drinksList);

    const cards = await screen.findAllByTestId(INGREDIENT_CARD);

    expect(cards[0]).toBeInTheDocument();
    expect(cards[0].lastChild.innerHTML).toBe('Light rum');
    await act(async () => userEvent.click(cards[1]));

    expect(HISTORY.location.pathname).toBe('/bebidas');
    const recipeCards = await screen.findAllByTestId(/-recipe-card/);

    expect(recipeCards).toHaveLength(RECIPE_LIMIT);

    recipeCards.forEach((recipe, index) => {
      expect(recipe).toBeInTheDocument();
      expect(recipe.lastChild.innerHTML).toBe(drinksList[index].strDrink);
    });
  });
});

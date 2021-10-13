import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import recipes from './support/RecipesExample';
import App from '../App';

const { recipeDrink } = recipes;
const {
  idDrink: id,
  strDrink: name,
  strDrinkThumb: image,
  strInstructions: drinkInstructions,
  strCategory: drinkCategory,
} = recipeDrink;

const IMG = 'recipe-photo';
const TITLE = 'recipe-title';
const CATEGORY = 'recipe-category';
const SHARE_BTN = 'share-btn';
const FAV_BTN = 'favorite-btn';
const INTRUCTIONS = 'instructions';
const FINISH_BTN = 'finish-recipe-btn';
const INGREDIENTS = /-ingredient-step/;
const URL = '/bebidas/178319/in-progress';
let HISTORY;

describe('Progress Recipe tests', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ drinks: [recipeDrink] }),
    }));

    await act(async () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        initialEntries: [URL],
      });
      HISTORY = history;
      // Referencia do act:
      // https://reactjs.org/docs/testing-recipes.html#act
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('Se os elementos corretos estão aparecendo, na tela de Bebida', async () => {
    const INGREDIENTS_NUMBER = 3;

    const img = await screen.findByTestId(IMG);
    const title = await screen.findByTestId(TITLE);
    const category = await screen.findByTestId(CATEGORY);
    const shareBtn = await screen.findByTestId(SHARE_BTN);
    const favBtn = await screen.findByTestId(FAV_BTN);
    const instructions = await screen.findByTestId(INTRUCTIONS);
    const finishBtn = await screen.findByTestId(FINISH_BTN);
    const ingredients = await screen.findAllByTestId(INGREDIENTS);

    expect(global.fetch).toHaveBeenCalled();

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe(name);

    expect(category).toBeInTheDocument();
    expect(category.innerHTML).toBe(drinkCategory);

    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();

    expect(instructions).toBeInTheDocument();
    expect(instructions.innerHTML).toBe(drinkInstructions);

    expect(finishBtn).toBeInTheDocument();
    expect(ingredients).toHaveLength(INGREDIENTS_NUMBER);

    const path = HISTORY.location.pathname;
    expect(path).toContain(id);
  });

  test('Se as funcionalidades da lista de ingredientes estão funcionando', async () => {
    const ingredients = await screen.findAllByTestId(INGREDIENTS);
    const finishBtn = await screen.findByTestId(FINISH_BTN);

    ingredients.forEach((ingredient) => {
      expect(ingredient.firstChild.checked).toBeFalsy();
    });
    expect(finishBtn.disabled).toBeTruthy();

    userEvent.click(ingredients[0]);
    expect(ingredients[0].firstChild.checked).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')))
      .toMatchObject({ meals: {}, cocktails: { 178319: { '0-ingredient-step': true } } });

    await act(async () => {
      renderWithRouterAndRedux(<App />, {
        initialEntries: [URL],
      });
    });

    expect(ingredients[0].firstChild.checked).toBeTruthy();
    userEvent.click(ingredients[0]);
    expect(ingredients[0].firstChild.checked).toBeFalsy();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')))
      .toMatchObject({ meals: {},
        cocktails: { 178319: { '0-ingredient-step': false } } });

    ingredients.forEach((ingredient) => {
      expect(ingredient.firstChild.checked).toBeFalsy();
    });
    expect(finishBtn.disabled).toBeTruthy();

    ingredients.forEach((ingredient) => {
      userEvent.click(ingredient);
      expect(ingredient.firstChild.checked).toBeTruthy();
    });
    expect(finishBtn.disabled).toBeFalsy();
    expect(JSON.parse(localStorage.getItem('inProgressRecipes')))
      .toMatchObject({
        meals: {},
        cocktails: { 178319: {
          '0-ingredient-step': true,
          '1-ingredient-step': true,
          '2-ingredient-step': true,
        } },
      });
  });

  test('Se as funcionalidades do finish button estão funcionando', async () => {
    const ingredients = await screen.findAllByTestId(INGREDIENTS);
    const finishBtn = await screen.findByTestId(FINISH_BTN);

    ingredients.forEach((ingredient) => {
      expect(ingredient.firstChild.checked).toBeTruthy();
    });
    expect(finishBtn.disabled).toBeFalsy();

    userEvent.click(finishBtn);
    expect(HISTORY.location.pathname).toBe('/receitas-feitas');
    expect(JSON.parse(localStorage.getItem('doneRecipes')))
      .toEqual([{
        alcoholicOrNot: 'Alcoholic',
        area: '',
        category: 'Cocktail',
        doneDate: `${new Date()
          .getDate()}/0${new Date().getMonth()}/${new Date().getFullYear()}`,
        id: '178319',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        name: 'Aquamarine',
        tags: [],
        type: 'bebida',
      }]);

    expect(JSON.parse(localStorage.getItem('inProgressRecipes')))
      .toMatchObject({ meals: {}, cocktails: {} });

    await act(async () => {
      renderWithRouterAndRedux(<App />, { initialEntries: [URL] });
    });

    screen.getAllByTestId(INGREDIENTS).forEach((ingredient) => {
      expect(ingredient.firstChild.checked).toBeFalsy();
    });
    expect(screen.getByTestId(FINISH_BTN).disabled).toBeTruthy();
  });
});

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import Comidas from '../pages/Comidas';
import fetchMock from './support/fetchMock';
import mealCategoriesMock from './support/mealCategoriesMock';
import mealsMock from './support/mealsMock';
import beefMealsMock from './support/beefMealsMock';
import breakfastMealsMock from './support/breakfastMealsMock';
import chickenMealsMock from './support/chickenMealsMock';
import dessertMealsMock from './support/dessertMealsMock';
import goatMealsMock from './support/goatMealsMock';

const CARDS_QUANTITY = 12;
const RECIPE_CARD = '-recipe-card';
const CARD_NAME = '-card-name';

describe('1. elementos da tela principal de receitas - Comidas', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    renderWithRouterAndRedux(<Comidas />);
  });
  test('1.1. A tela tem os 12 cards da tela de comidas', async () => {
    expect((await screen.findAllByTestId(/-recipe-card/)).length).toBe(CARDS_QUANTITY);
  });
  test('1.2. Os cards estão corretos na tela de comidas', async () => {
    expect(await screen.findByTestId(`0${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`1${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`2${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`3${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`4${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`5${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`6${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`7${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`8${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`9${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`10${RECIPE_CARD}`)).toBeInTheDocument();
    expect(await screen.findByTestId(`11${RECIPE_CARD}`)).toBeInTheDocument();
  });
  test('1.3. A tela tem 5 botões de categoria', async () => {
    expect(await screen.findByTestId('All-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId(`${mealCategoriesMock.meals[0]
      .strCategory}-category-filter`)).toBeInTheDocument();
    expect(await screen.findByTestId(`${mealCategoriesMock.meals[1]
      .strCategory}-category-filter`)).toBeInTheDocument();
    expect(await screen.findByTestId(`${mealCategoriesMock.meals[2]
      .strCategory}-category-filter`)).toBeInTheDocument();
    expect(await screen.findByTestId(`${mealCategoriesMock.meals[3]
      .strCategory}-category-filter`)).toBeInTheDocument();
    expect(await screen.findByTestId(`${mealCategoriesMock.meals[4]
      .strCategory}-category-filter`)).toBeInTheDocument();
  });
});
describe('2. Elementos dos Cards da tela principal de receitas - Comidas', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    renderWithRouterAndRedux(<Comidas />);
  });
  test('2.1. Imagem e Name em cada Card', async () => {
    const imgCard = await screen.findAllByTestId(/-card-img/);
    expect(imgCard[0]).toHaveAttribute('src', mealsMock.meals[0].strMealThumb);
    expect(imgCard[1]).toHaveAttribute('src', mealsMock.meals[1].strMealThumb);
    expect(imgCard[2]).toHaveAttribute('src', mealsMock.meals[2].strMealThumb);
    expect(imgCard[3]).toHaveAttribute('src', mealsMock.meals[3].strMealThumb);
    expect(imgCard[4]).toHaveAttribute('src', mealsMock.meals[4].strMealThumb);
    expect(imgCard[5]).toHaveAttribute('src', mealsMock.meals[5].strMealThumb);
    expect(imgCard[6]).toHaveAttribute('src', mealsMock.meals[6].strMealThumb);
    expect(imgCard[7]).toHaveAttribute('src', mealsMock.meals[7].strMealThumb);
    expect(imgCard[8]).toHaveAttribute('src', mealsMock.meals[8].strMealThumb);
    expect(imgCard[9]).toHaveAttribute('src', mealsMock.meals[9].strMealThumb);
    expect(imgCard[10]).toHaveAttribute('src', mealsMock.meals[10].strMealThumb);
    expect(imgCard[11]).toHaveAttribute('src', mealsMock.meals[11].strMealThumb);
    const nameCard = await screen.findAllByTestId(/-card-name/);
    expect(nameCard[0]).toHaveTextContent(mealsMock.meals[0].strMeal);
    expect(nameCard[1]).toHaveTextContent(mealsMock.meals[1].strMeal);
    expect(nameCard[2]).toHaveTextContent(mealsMock.meals[2].strMeal);
    expect(nameCard[3]).toHaveTextContent(mealsMock.meals[3].strMeal);
    expect(nameCard[4]).toHaveTextContent(mealsMock.meals[4].strMeal);
    expect(nameCard[5]).toHaveTextContent(mealsMock.meals[5].strMeal);
    expect(nameCard[6]).toHaveTextContent(mealsMock.meals[6].strMeal);
    expect(nameCard[7]).toHaveTextContent(mealsMock.meals[7].strMeal);
    expect(nameCard[8]).toHaveTextContent(mealsMock.meals[8].strMeal);
    expect(nameCard[9]).toHaveTextContent(mealsMock.meals[9].strMeal);
    expect(nameCard[10]).toHaveTextContent(mealsMock.meals[10].strMeal);
    expect(nameCard[11]).toHaveTextContent(mealsMock.meals[11].strMeal);
  });
  test('2.1. Link em cada Card', async () => {
    const links = await screen.findAllByRole('link');
    expect(links[0]).toHaveAttribute('href', `/comidas/${mealsMock.meals[0].idMeal}`);
    expect(links[1]).toHaveAttribute('href', `/comidas/${mealsMock.meals[1].idMeal}`);
    expect(links[2]).toHaveAttribute('href', `/comidas/${mealsMock.meals[2].idMeal}`);
    expect(links[3]).toHaveAttribute('href', `/comidas/${mealsMock.meals[3].idMeal}`);
    expect(links[4]).toHaveAttribute('href', `/comidas/${mealsMock.meals[4].idMeal}`);
    expect(links[5]).toHaveAttribute('href', `/comidas/${mealsMock.meals[5].idMeal}`);
    expect(links[6]).toHaveAttribute('href', `/comidas/${mealsMock.meals[6].idMeal}`);
    expect(links[7]).toHaveAttribute('href', `/comidas/${mealsMock.meals[7].idMeal}`);
    expect(links[8]).toHaveAttribute('href', `/comidas/${mealsMock.meals[8].idMeal}`);
    expect(links[9]).toHaveAttribute('href', `/comidas/${mealsMock.meals[9].idMeal}`);
    expect(links[10]).toHaveAttribute('href', `/comidas/${mealsMock.meals[10].idMeal}`);
    expect(links[11]).toHaveAttribute('href', `/comidas/${mealsMock.meals[11].idMeal}`);
  });
});
describe('3. Filtragem dos Cards da tela principal de receitas - Comidas', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    renderWithRouterAndRedux(<Comidas />);
  });
  test('3.1. Botão Beef', async () => {
    fireEvent.click(await screen.findByTestId('Beef-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[0].strMeal);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[1].strMeal);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[2].strMeal);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[3].strMeal);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[4].strMeal);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[5].strMeal);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[6].strMeal);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[7].strMeal);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[8].strMeal);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[9].strMeal);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[10].strMeal);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(beefMealsMock.meals[11].strMeal);
  });
  test('3.2. Botão Brealfast', async () => {
    fireEvent.click(await screen.findByTestId('Breakfast-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[0].strMeal);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[1].strMeal);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[2].strMeal);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[3].strMeal);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[4].strMeal);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[5].strMeal);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(breakfastMealsMock.meals[6].strMeal);
  });
  test('3.3. Botão Chicken', async () => {
    fireEvent.click(await screen.findByTestId('Chicken-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[0].strMeal);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[1].strMeal);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[2].strMeal);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[3].strMeal);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[4].strMeal);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[5].strMeal);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[6].strMeal);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[7].strMeal);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[8].strMeal);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[9].strMeal);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[10].strMeal);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(chickenMealsMock.meals[11].strMeal);
  });
  test('3.4. Botão Dessert', async () => {
    fireEvent.click(await screen.findByTestId('Dessert-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[0].strMeal);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[1].strMeal);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[2].strMeal);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[3].strMeal);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[4].strMeal);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[5].strMeal);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[6].strMeal);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[7].strMeal);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[8].strMeal);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[9].strMeal);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[10].strMeal);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(dessertMealsMock.meals[11].strMeal);
  });
  test('3.5. Botão Goat', async () => {
    fireEvent.click(await screen.findByTestId('Goat-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(goatMealsMock.meals[0].strMeal);
  });
  test('3.6. Botão All', async () => {
    fireEvent.click(await screen.findByTestId('Goat-category-filter'));
    fireEvent.click(await screen.findByTestId('All-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[0].strMeal);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[1].strMeal);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[2].strMeal);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[3].strMeal);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[4].strMeal);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[5].strMeal);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[6].strMeal);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[7].strMeal);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[8].strMeal);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[9].strMeal);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[10].strMeal);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(mealsMock.meals[11].strMeal);
  });
});

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import Bebidas from '../pages/Bebidas';
import fetchMock from './support/fetchMock';
import drinkCategoriesMock from './support/drinkCategoriesMock';
import drinksMock from './support/drinksMock';
import ordinaryDrinksMock from './support/ordinaryDrinksMock';
import cocktailDrinksMock from './support/cocktailDrinksMock';
import milkDrinksMock from './support/milkDrinksMock';
import otherDrinksMock from './support/otherDrinksMock';
import cocoaDrinksMock from './support/cocoaDrinksMock';

const CARDS_QUANTITY = 12;
const RECIPE_CARD = '-recipe-card';
const CARD_NAME = '-card-name';
describe('1. elementos da tela principal de receitas - Bebidas', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    renderWithRouterAndRedux(<Bebidas />);
  });
  test('1.1. A tela tem os 12 cards da tela de bebidas', async () => {
    expect((await screen.findAllByTestId(/-recipe-card/)).length).toBe(CARDS_QUANTITY);
  });
  test('1.2. Os cards estão corretos na tela de bebidas', async () => {
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
    expect(await screen
      .findByTestId(`${drinkCategoriesMock.drinks[0].strCategory}-category-filter`))
      .toBeInTheDocument();
    expect(await screen
      .findByTestId(`${drinkCategoriesMock.drinks[1].strCategory}-category-filter`))
      .toBeInTheDocument();
    expect(await screen
      .findByTestId(`${drinkCategoriesMock.drinks[2].strCategory}-category-filter`))
      .toBeInTheDocument();
    expect(await screen
      .findByTestId(`${drinkCategoriesMock.drinks[3].strCategory}-category-filter`))
      .toBeInTheDocument();
    expect(await screen
      .findByTestId(`${drinkCategoriesMock.drinks[4].strCategory}-category-filter`))
      .toBeInTheDocument();
  });
});
describe('2. Elementos dos Cards da tela principal de receitas - Bebidas', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    renderWithRouterAndRedux(<Bebidas />);
  });
  test('2.1. Imagem e Name em cada Card', async () => {
    const imgCard = await screen.findAllByTestId(/-card-img/);
    expect(imgCard[0]).toHaveAttribute('src', drinksMock.drinks[0].strDrinkThumb);
    expect(imgCard[1]).toHaveAttribute('src', drinksMock.drinks[1].strDrinkThumb);
    expect(imgCard[2]).toHaveAttribute('src', drinksMock.drinks[2].strDrinkThumb);
    expect(imgCard[3]).toHaveAttribute('src', drinksMock.drinks[3].strDrinkThumb);
    expect(imgCard[4]).toHaveAttribute('src', drinksMock.drinks[4].strDrinkThumb);
    expect(imgCard[5]).toHaveAttribute('src', drinksMock.drinks[5].strDrinkThumb);
    expect(imgCard[6]).toHaveAttribute('src', drinksMock.drinks[6].strDrinkThumb);
    expect(imgCard[7]).toHaveAttribute('src', drinksMock.drinks[7].strDrinkThumb);
    expect(imgCard[8]).toHaveAttribute('src', drinksMock.drinks[8].strDrinkThumb);
    expect(imgCard[9]).toHaveAttribute('src', drinksMock.drinks[9].strDrinkThumb);
    expect(imgCard[10]).toHaveAttribute('src', drinksMock.drinks[10].strDrinkThumb);
    expect(imgCard[11]).toHaveAttribute('src', drinksMock.drinks[11].strDrinkThumb);
    const nameCard = await screen.findAllByTestId(/-card-name/);
    expect(nameCard[0]).toHaveTextContent(drinksMock.drinks[0].strDrink);
    expect(nameCard[1]).toHaveTextContent(drinksMock.drinks[1].strDrink);
    expect(nameCard[2]).toHaveTextContent(drinksMock.drinks[2].strDrink);
    expect(nameCard[3]).toHaveTextContent(drinksMock.drinks[3].strDrink);
    expect(nameCard[4]).toHaveTextContent(drinksMock.drinks[4].strDrink);
    expect(nameCard[5]).toHaveTextContent(drinksMock.drinks[5].strDrink);
    expect(nameCard[6]).toHaveTextContent(drinksMock.drinks[6].strDrink);
    expect(nameCard[7]).toHaveTextContent(drinksMock.drinks[7].strDrink);
    expect(nameCard[8]).toHaveTextContent(drinksMock.drinks[8].strDrink);
    expect(nameCard[9]).toHaveTextContent(drinksMock.drinks[9].strDrink);
    expect(nameCard[10]).toHaveTextContent(drinksMock.drinks[10].strDrink);
    expect(nameCard[11]).toHaveTextContent(drinksMock.drinks[11].strDrink);
  });
  test('2.1. Link em cada Card', async () => {
    const links = await screen.findAllByRole('link');
    expect(links[0]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[0].idDrink}`);
    expect(links[1]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[1].idDrink}`);
    expect(links[2]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[2].idDrink}`);
    expect(links[3]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[3].idDrink}`);
    expect(links[4]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[4].idDrink}`);
    expect(links[5]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[5].idDrink}`);
    expect(links[6]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[6].idDrink}`);
    expect(links[7]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[7].idDrink}`);
    expect(links[8]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[8].idDrink}`);
    expect(links[9]).toHaveAttribute('href', `/bebidas/${drinksMock.drinks[9].idDrink}`);
    expect(links[10])
      .toHaveAttribute('href', `/bebidas/${drinksMock.drinks[10].idDrink}`);
    expect(links[11])
      .toHaveAttribute('href', `/bebidas/${drinksMock.drinks[11].idDrink}`);
  });
});
describe('3. Filtragem dos Cards da tela principal de receitas - Bebidas', () => {
  beforeEach(() => {
    global.fetch = fetchMock;
    renderWithRouterAndRedux(<Bebidas />);
  });
  test('3.1. Botão Ordinary Drink', async () => {
    fireEvent.click(await screen.findByTestId('Ordinary Drink-category-filter'));
    const OrdinaryDrinks = await screen.findAllByTestId(/-card-name/);
    expect(OrdinaryDrinks[0]).toHaveTextContent(ordinaryDrinksMock.drinks[0].strDrink);
    expect(OrdinaryDrinks[1]).toHaveTextContent(ordinaryDrinksMock.drinks[1].strDrink);
    expect(OrdinaryDrinks[2]).toHaveTextContent(ordinaryDrinksMock.drinks[2].strDrink);
    expect(OrdinaryDrinks[3]).toHaveTextContent(ordinaryDrinksMock.drinks[3].strDrink);
    expect(OrdinaryDrinks[4]).toHaveTextContent(ordinaryDrinksMock.drinks[4].strDrink);
    expect(OrdinaryDrinks[5]).toHaveTextContent(ordinaryDrinksMock.drinks[5].strDrink);
    expect(OrdinaryDrinks[6]).toHaveTextContent(ordinaryDrinksMock.drinks[6].strDrink);
    expect(OrdinaryDrinks[7]).toHaveTextContent(ordinaryDrinksMock.drinks[7].strDrink);
    expect(OrdinaryDrinks[8]).toHaveTextContent(ordinaryDrinksMock.drinks[8].strDrink);
    expect(OrdinaryDrinks[9]).toHaveTextContent(ordinaryDrinksMock.drinks[9].strDrink);
    expect(OrdinaryDrinks[10]).toHaveTextContent(ordinaryDrinksMock.drinks[10].strDrink);
    expect(OrdinaryDrinks[11]).toHaveTextContent(ordinaryDrinksMock.drinks[11].strDrink);
  });
  test('3.2. Botão Cocktail', async () => {
    fireEvent.click(await screen.findByTestId('Cocktail-category-filter'));
    const CocktailDrinks = await screen.findAllByTestId(/-card-name/);
    expect(CocktailDrinks[0]).toHaveTextContent(cocktailDrinksMock.drinks[0].strDrink);
    expect(CocktailDrinks[1]).toHaveTextContent(cocktailDrinksMock.drinks[1].strDrink);
    expect(CocktailDrinks[2]).toHaveTextContent(cocktailDrinksMock.drinks[2].strDrink);
    expect(CocktailDrinks[3]).toHaveTextContent(cocktailDrinksMock.drinks[3].strDrink);
    expect(CocktailDrinks[4]).toHaveTextContent(cocktailDrinksMock.drinks[4].strDrink);
    expect(CocktailDrinks[5]).toHaveTextContent(cocktailDrinksMock.drinks[5].strDrink);
    expect(CocktailDrinks[6]).toHaveTextContent(cocktailDrinksMock.drinks[6].strDrink);
    expect(CocktailDrinks[7]).toHaveTextContent(cocktailDrinksMock.drinks[7].strDrink);
    expect(CocktailDrinks[8]).toHaveTextContent(cocktailDrinksMock.drinks[8].strDrink);
    expect(CocktailDrinks[9]).toHaveTextContent(cocktailDrinksMock.drinks[9].strDrink);
    expect(CocktailDrinks[10]).toHaveTextContent(cocktailDrinksMock.drinks[10].strDrink);
    expect(CocktailDrinks[11]).toHaveTextContent(cocktailDrinksMock.drinks[11].strDrink);
  });
  test('3.3. Botão Milk / Float / Shake', async () => {
    fireEvent.click(await screen.findByTestId('Milk / Float / Shake-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[0].strDrink);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[1].strDrink);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[2].strDrink);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[3].strDrink);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[4].strDrink);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[5].strDrink);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[6].strDrink);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[7].strDrink);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[8].strDrink);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[9].strDrink);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[10].strDrink);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(milkDrinksMock.drinks[11].strDrink);
  });
  test('3.4. Botão Other/Unknown', async () => {
    fireEvent.click(await screen.findByTestId('Other/Unknown-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[0].strDrink);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[1].strDrink);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[2].strDrink);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[3].strDrink);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[4].strDrink);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[5].strDrink);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[6].strDrink);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[7].strDrink);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[8].strDrink);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[9].strDrink);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[10].strDrink);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(otherDrinksMock.drinks[11].strDrink);
  });
  test('3.5. Botão Cocoa', async () => {
    fireEvent.click(await screen.findByTestId('Cocoa-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[0].strDrink);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[1].strDrink);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[2].strDrink);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[3].strDrink);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[4].strDrink);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[5].strDrink);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[6].strDrink);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[7].strDrink);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(cocoaDrinksMock.drinks[8].strDrink);
  });
  test('3.6. Botão All', async () => {
    fireEvent.click(await screen.findByTestId('Cocoa-category-filter'));
    fireEvent.click(await screen.findByTestId('All-category-filter'));
    expect(await screen.findByTestId(`0${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[0].strDrink);
    expect(await screen.findByTestId(`1${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[1].strDrink);
    expect(await screen.findByTestId(`2${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[2].strDrink);
    expect(await screen.findByTestId(`3${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[3].strDrink);
    expect(await screen.findByTestId(`4${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[4].strDrink);
    expect(await screen.findByTestId(`5${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[5].strDrink);
    expect(await screen.findByTestId(`6${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[6].strDrink);
    expect(await screen.findByTestId(`7${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[7].strDrink);
    expect(await screen.findByTestId(`8${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[8].strDrink);
    expect(await screen.findByTestId(`9${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[9].strDrink);
    expect(await screen.findByTestId(`10${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[10].strDrink);
    expect(await screen.findByTestId(`11${CARD_NAME}`))
      .toHaveTextContent(drinksMock.drinks[11].strDrink);
  });
});

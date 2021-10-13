import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import ReceitasFeitas from '../pages/ReceitasFeitas';

import DoneRecipesMock from './support/DoneRecipesMock';

const ALL_BTN = 'filter-by-all-btn';
const DRINK_BTN = 'filter-by-drink-btn';
const FOOD_BTN = 'filter-by-food-btn';
const IMG_0 = '0-horizontal-image';
const IMG_1 = '1-horizontal-image';
const TOP_TEXT_0 = '0-horizontal-top-text';
const TOP_TEXT_1 = '1-horizontal-top-text';
const NAME_0 = '0-horizontal-name';
const NAME_1 = '1-horizontal-name';
const DONE_DATE_0 = '0-horizontal-done-date';
const DONE_DATE_1 = '1-horizontal-done-date';
const SHARE_BTN_0 = '0-horizontal-share-btn';
const SHARE_BTN_1 = '1-horizontal-share-btn';
const SHARE_ICON = 'shareIcon.svg';
const PASTA_TAG = '0-Pasta-horizontal-tag';
const CURRY_TAG = '0-Curry-horizontal-tag';

const startLocalStorageToTestSetup = () => {
  localStorage.clear();
  localStorage.setItem('doneRecipes', JSON.stringify(DoneRecipesMock));
};

describe('1. Implemente os elementos da tela de receitas feitas', () => {
  test('1.1. Renderiza o botão de filtro All', () => {
    startLocalStorageToTestSetup();
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(ALL_BTN)).toBeInTheDocument();
  });

  test('1.2. Renderiza o botão de filtro Food', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(FOOD_BTN)).toBeInTheDocument();
  });

  test('1.3. Renderiza o botão de filtro Drinks', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(DRINK_BTN)).toBeInTheDocument();
  });

  test('1.4. Renderiza a imagem do card', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(IMG_0)).toBeInTheDocument();
    expect(screen.getByTestId(IMG_1)).toBeInTheDocument();
  });

  test('1.5. Renderiza a categoria da receita', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(TOP_TEXT_0)).toBeInTheDocument();
    expect(screen.getByTestId(TOP_TEXT_1)).toBeInTheDocument();
  });

  test('1.6. Renderiza o nome da receita', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(NAME_0)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_1)).toBeInTheDocument();
  });

  test('1.7. Renderiza a data que a receita foi feita', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(DONE_DATE_0)).toBeInTheDocument();
    expect(screen.getByTestId(DONE_DATE_1)).toBeInTheDocument();
  });

  test('1.8. Renderiza o elemento de compartilhar a receita', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(SHARE_BTN_0)).toBeInTheDocument();
    expect(screen.getByTestId(SHARE_BTN_1)).toBeInTheDocument();
  });

  test('1.9. Renderiza as tags da receita', () => {
    renderWithRouterAndRedux(<ReceitasFeitas />);
    expect(screen.getByTestId(PASTA_TAG)).toBeInTheDocument();
    expect(screen.getByTestId(CURRY_TAG)).toBeInTheDocument();
  });
});

describe('2. Teste os elementos dos cards da tela de receitas feitas', () => {
  test('2.1. Card de Comida', () => {
    startLocalStorageToTestSetup();
    renderWithRouterAndRedux(<ReceitasFeitas />);

    expect(screen.getByTestId(IMG_0))
      .toHaveAttribute('src', DoneRecipesMock[0].image);
    expect(screen.getByTestId(NAME_0))
      .toHaveTextContent(DoneRecipesMock[0].name);
    expect(screen.getByTestId(TOP_TEXT_0)) // area e categoria
      .toHaveTextContent(`${DoneRecipesMock[0].area} - ${DoneRecipesMock[0].category}`);
    expect(screen.getByTestId(DONE_DATE_0))
      .toHaveTextContent(DoneRecipesMock[0].doneDate);
    expect(screen.getByTestId(PASTA_TAG))
      .toHaveTextContent(DoneRecipesMock[0].tags[0]);
    expect(screen.getByTestId(CURRY_TAG))
      .toHaveTextContent(DoneRecipesMock[0].tags[1]);
    expect(screen.getByTestId(SHARE_BTN_0))
      .toHaveAttribute('src', SHARE_ICON);
  });

  test('2.2. Card de Comida', () => {
    startLocalStorageToTestSetup();
    renderWithRouterAndRedux(<ReceitasFeitas />);

    expect(screen.getByTestId(IMG_1))
      .toHaveAttribute('src', DoneRecipesMock[1].image);
    expect(screen.getByTestId(NAME_1))
      .toHaveTextContent(DoneRecipesMock[1].name);
    expect(screen.getByTestId(TOP_TEXT_1)) // Alcoholic
      .toHaveTextContent(DoneRecipesMock[1].alcoholicOrNot);
    expect(screen.getByTestId(DONE_DATE_1))
      .toHaveTextContent(DoneRecipesMock[1].doneDate);
    expect(screen.getByTestId(SHARE_BTN_1))
      .toHaveAttribute('src', SHARE_ICON);
  });
});

describe('3. Teste os filtros dos cards da tela de receitas feitas', () => {
  test('3.1. Filtro Foods', () => {
    startLocalStorageToTestSetup();
    renderWithRouterAndRedux(<ReceitasFeitas />);

    userEvent.click(screen.getByTestId(FOOD_BTN));

    expect(screen.getAllByTestId(/horizontal-name/).length).toBe(1);
    expect(screen.getByTestId(IMG_0))
      .toHaveAttribute('src', DoneRecipesMock[0].image);
    expect(screen.getByTestId(NAME_0))
      .toHaveTextContent(DoneRecipesMock[0].name);
    expect(screen.getByTestId(TOP_TEXT_0)) // area e categoria
      .toHaveTextContent(`${DoneRecipesMock[0].area} - ${DoneRecipesMock[0].category}`);
    expect(screen.getByTestId(DONE_DATE_0))
      .toHaveTextContent(DoneRecipesMock[0].doneDate);
    expect(screen.getByTestId(PASTA_TAG))
      .toHaveTextContent(DoneRecipesMock[0].tags[0]);
    expect(screen.getByTestId(CURRY_TAG))
      .toHaveTextContent(DoneRecipesMock[0].tags[1]);
    expect(screen.getByTestId(SHARE_BTN_0))
      .toHaveAttribute('src', SHARE_ICON);
  });

  test('3.2. Filtro Drinks', () => {
    startLocalStorageToTestSetup();
    renderWithRouterAndRedux(<ReceitasFeitas />);

    userEvent.click(screen.getByTestId(DRINK_BTN));

    expect(screen.getAllByTestId(/horizontal-name/).length).toBe(1);
    expect(screen.getByTestId(IMG_0))
      .toHaveAttribute('src', DoneRecipesMock[1].image);
    expect(screen.getByTestId(NAME_0))
      .toHaveTextContent(DoneRecipesMock[1].name);
    expect(screen.getByTestId(TOP_TEXT_0)) // Alcoholic
      .toHaveTextContent(DoneRecipesMock[1].alcoholicOrNot);
    expect(screen.getByTestId(DONE_DATE_0))
      .toHaveTextContent(DoneRecipesMock[1].doneDate);
    expect(screen.getByTestId(SHARE_BTN_0))
      .toHaveAttribute('src', SHARE_ICON);
  });

  test('3.3. Filtro All', () => {
    startLocalStorageToTestSetup();
    renderWithRouterAndRedux(<ReceitasFeitas />);

    userEvent.click(screen.getByTestId(DRINK_BTN));

    userEvent.click(screen.getByTestId(ALL_BTN));

    expect(screen.getAllByTestId(/horizontal-name/).length).toBe(2);
    expect(screen.getByTestId(IMG_0))
      .toHaveAttribute('src', DoneRecipesMock[0].image);
    expect(screen.getByTestId(NAME_0))
      .toHaveTextContent(DoneRecipesMock[0].name);
    expect(screen.getByTestId(TOP_TEXT_0)) // area e categoria
      .toHaveTextContent(`${DoneRecipesMock[0].area} - ${DoneRecipesMock[0].category}`);
    expect(screen.getByTestId(DONE_DATE_0))
      .toHaveTextContent(DoneRecipesMock[0].doneDate);
    expect(screen.getByTestId(PASTA_TAG))
      .toHaveTextContent(DoneRecipesMock[0].tags[0]);
    expect(screen.getByTestId(CURRY_TAG))
      .toHaveTextContent(DoneRecipesMock[0].tags[1]);
    expect(screen.getByTestId(SHARE_BTN_0))
      .toHaveAttribute('src', SHARE_ICON);
    expect(screen.getByTestId(IMG_1))
      .toHaveAttribute('src', DoneRecipesMock[1].image);
    expect(screen.getByTestId(NAME_1))
      .toHaveTextContent(DoneRecipesMock[1].name);
    expect(screen.getByTestId(TOP_TEXT_1)) // Alcoholic
      .toHaveTextContent(DoneRecipesMock[1].alcoholicOrNot);
    expect(screen.getByTestId(DONE_DATE_1))
      .toHaveTextContent(DoneRecipesMock[1].doneDate);
    expect(screen.getByTestId(SHARE_BTN_1))
      .toHaveAttribute('src', SHARE_ICON);
  });
});

describe('4. Redirecione para a tela de detalhes da receita', () => {
  test('4.1. Ao clicar na foto da receita', () => {
    startLocalStorageToTestSetup();
    const { history } = renderWithRouterAndRedux(<ReceitasFeitas />);

    userEvent.click(screen.getByTestId(IMG_0));

    expect(history.location.pathname).toBe(`/comidas/${DoneRecipesMock[0].id}`);
  });

  test('4.1. Ao clicar no nome da receita', () => {
    startLocalStorageToTestSetup();
    const { history } = renderWithRouterAndRedux(<ReceitasFeitas />);

    userEvent.click(screen.getByTestId(NAME_0));

    expect(history.location.pathname).toBe(`/comidas/${DoneRecipesMock[0].id}`);
  });
});

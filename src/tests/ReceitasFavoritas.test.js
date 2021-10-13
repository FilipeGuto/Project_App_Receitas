import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import favoriteRecipes from './support/MockLocalStorageFavoriteRecipes';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

const HORIZONTAL_IMAGES = /-horizontal-image/;
const TEXT_DESCRIPTION = /-horizontal-top-text/;
const NAME_RECIPE = /-horizontal-name/;
const SHARE_BTN = /-horizontal-share-btn/;
const FAVORITE_BTN = /-horizontal-favorite-btn/;
const PATH_BEBIDAS = '/bebidas/15997';

describe('Receitas favoritas', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<ReceitasFavoritas />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  it('Testa se aparece o título na tela', () => {
    const TEXT_TITLE = screen.getByText('Receitas Favoritas');
    expect(TEXT_TITLE).toBeInTheDocument();
  });
  it('Testa se tem o ícone correto na tela', () => {
    const ICONE_PROFILE = screen.getByTestId('profile-top-btn');
    expect(ICONE_PROFILE).toBeInTheDocument();
  });
  it('Verifica se possui o botão All', () => {
    const BTN_ALL = screen.getByTestId('filter-by-all-btn');
    expect(BTN_ALL).toBeInTheDocument();
  });
  it('Verifica se há o botão de filtrar por food', () => {
    const BTN_FOOD = screen.getByTestId('filter-by-food-btn');
    expect(BTN_FOOD).toBeInTheDocument();
  });
  it('Testa se o botão de favorito está na tela', () => {
    const BTN_DRINK = screen.getByTestId('filter-by-drink-btn');
    expect(BTN_DRINK).toBeInTheDocument();
  });
  it('Verifica se possuem as imagens corretas na tela', () => {
    const RECIPES_PHOTO = screen.getAllByTestId(HORIZONTAL_IMAGES);
    expect(RECIPES_PHOTO.length).toBe(2);
  });
  it('Testa se possuem as descrições dos alimentos corretamente na tela', () => {
    const TEXT_INSTRUCTIONS = screen.getAllByTestId(TEXT_DESCRIPTION);
    expect(TEXT_INSTRUCTIONS.length).toBe(2);
  });
  it('Testa se há os nomes corretos na tela', () => {
    const NAME_RECIPES = screen.getAllByTestId(NAME_RECIPE);
    expect(NAME_RECIPES.length).toBe(2);
  });
  it('Testa se possuem os botões de share na tela', () => {
    const SHARE_BTNS = screen.getAllByTestId(SHARE_BTN);
    expect(SHARE_BTNS.length).toBe(2);
  });
  it('Testa se há os botões de favoritos na tela', () => {
    const FAVORITE_BTNS = screen.getAllByTestId(FAVORITE_BTN);
    expect(FAVORITE_BTNS.length).toBe(2);
  });
  it('Ao clicar na imagem da receita é levado para página correta', async () => {
    const { history } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const IMAGE_RECIPE = screen.getAllByTestId(HORIZONTAL_IMAGES);
    fireEvent.click(IMAGE_RECIPE[0]);
    history.push(PATH_BEBIDAS);
    expect(history.location.pathname).toBe('/bebidas/15997');
  });
  it('Ao clickar no botão de desfavoritar o card é removido', () => {
    const BTN_FAVORITE = screen.getAllByTestId(FAVORITE_BTN);
    fireEvent.click(BTN_FAVORITE[0]);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([{
      ...favoriteRecipes[1],
    }]);
  });
  it('Ao clicar no titulo da receita é levado para página correta', () => {
    const { history } = renderWithRouterAndRedux(<ReceitasFavoritas />);
    const BUTTON_NAME = screen.getAllByTestId(NAME_RECIPE);
    fireEvent.click(BUTTON_NAME[0]);
    history.push(PATH_BEBIDAS);
    expect(history.location.pathname).toBe(PATH_BEBIDAS);
  });
  it('Ao clicar no botão All aprecem todas receitas', () => {
    const BTN_FILTER_ALL = screen.getByTestId('filter-by-all-btn');
    fireEvent.click(BTN_FILTER_ALL);
    const IMAGE_RECIPES = screen.getAllByTestId(HORIZONTAL_IMAGES);
    expect(IMAGE_RECIPES.length).toBe(2);
  });
  it('Ao clicar no botão de food só aparece a comida', () => {
    const BTN_FILTER_FOOD = screen.getByTestId('filter-by-food-btn');
    fireEvent.click(BTN_FILTER_FOOD);
    const NAME_FOOD = screen.getByText('Turkish - Side');
    expect(NAME_FOOD).toBeInTheDocument();
  });
  it('Ao clickar no botão de drinks aparecem somente os drinks', () => {
    const BTN_FILTER_DRINK = screen.getByTestId('filter-by-drink-btn');
    fireEvent.click(BTN_FILTER_DRINK);
    const NAME_DRINK = screen.getByText('GG');
    expect(NAME_DRINK).toBeInTheDocument();
  });
});

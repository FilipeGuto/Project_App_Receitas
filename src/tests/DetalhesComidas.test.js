import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import App from '../App';

const IMG = 'recipe-photo';
const TITLE = 'recipe-title';
const CATEGORY = 'recipe-category';
const SHARE_BTN = 'share-btn';
const FAV_BTN = 'favorite-btn';
const INSTRUCTIONS = 'instructions';
const VIDEO = 'video';
const BTN_INICIAR = 'start-recipe-btn';
const RECOMENDATIONS = /-recomendation-card/;
const RECOMENDATIONS_TITLE = /-recomendation-title/;
const URL = '/comidas/52878';
const NUMBER_CARDS = 6;

describe('Detalhes comidas', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: [URL],
    });
  });

  it('Testa se aparece o título na tela', async () => {
    const TEXT_TITLE = await screen.findByText('Detalhes comidas');
    expect(TEXT_TITLE).toBeInTheDocument();
  });
  it('Testa se aparece imagem da comida na tela', async () => {
    const IMAGEM_COMIDA = await screen.findByTestId(IMG);
    expect(IMAGEM_COMIDA).toBeInTheDocument();
  });
  it('Testa se aparece o nome da comida na tela', async () => {
    const NOME_COMIDA = await screen.findByTestId(TITLE);
    expect(NOME_COMIDA).toBeInTheDocument();
  });
  it('Testa se existe botão de Share', async () => {
    const BTN_SHARE = await screen.findByTestId(SHARE_BTN);
    expect(BTN_SHARE).toBeInTheDocument();
  });
  it('Testa se o botão de favorito está na tela', async () => {
    const BTN_FAVORITE = await screen.findByTestId(FAV_BTN);
    expect(BTN_FAVORITE).toBeInTheDocument();
  });
  it('Testa se o texto de categoria está na tela', async () => {
    const TEXT_CATEGORY = await screen.findByTestId(CATEGORY);
    expect(TEXT_CATEGORY).toBeInTheDocument();
  });
  it('Testa se as instruções estão na tela', async () => {
    const TEXT_INSTRUCTIONS = await screen.findByTestId(INSTRUCTIONS);
    expect(TEXT_INSTRUCTIONS).toBeInTheDocument();
  });
  it('Testa se o vídeo está na tela', async () => {
    const VIDEO_PLAY = await screen.findByTestId(VIDEO);
    expect(VIDEO_PLAY).toBeInTheDocument();
  });
  it('Testa se possuem os cards de titulos de recomendações na tela', async () => {
    const CARDS_RECOMENDATIONS_TITLE = await screen.findAllByTestId(RECOMENDATIONS_TITLE);
    expect(CARDS_RECOMENDATIONS_TITLE.length).toBe(NUMBER_CARDS);
  });
  it('Testa se tem a quantidade certa de cards de recomendação na tela', async () => {
    const CARDS_RECOMENDATIONS = await screen.findAllByTestId(RECOMENDATIONS);
    expect(CARDS_RECOMENDATIONS.length).toBe(NUMBER_CARDS);
  });
  it('Testa se há o botão de iniciar receita', async () => {
    const BTN_START = await screen.findByTestId(BTN_INICIAR);
    expect(BTN_START).toBeInTheDocument();
  });
  it('Ao clicar no botão de iniciar receita é levado para página correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: [URL],
    });
    const BTN_START = await screen.findAllByTestId(BTN_INICIAR);
    fireEvent.dblClick(BTN_START[0]);
    history.push('/comidas/52878/in-progress');
    expect(history.location.pathname).toBe('/comidas/52878/in-progress');
  });
  it('Ao clicar no botão de favorito, é salvo corretamente no localstorage', async () => {
    const BTN_FAVORITE = await screen.findByTestId(FAV_BTN);
    fireEvent.click(BTN_FAVORITE);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([{
      alcoholicOrNot: '',
      area: 'British',
      category: 'Beef',
      id: '52878',
      image: 'https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg',
      name: 'Beef and Oyster pie',
      type: 'comida',
    }]);
  });
});

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import Comidas from '../pages/Comidas';

const NUMBER_CARDS = 10;
const NUMBER_CARDS_NAME = 12;

const SEARCHINPUT = 'search-input';
const SEARCHTOPBTN = 'search-top-btn';
const EXECSEARCHBTN = 'exec-search-btn';

describe('Header search', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<Comidas />);
  });
  it('Verifica se o título está na página', async () => {
    const PAGE_TITLE = screen.getByText('Comidas');
    expect(PAGE_TITLE).toBeInTheDocument();
  });
  it('Verifica se tem o input não está na tela ao entrar', () => {
    expect(screen.queryByTestId(SEARCHINPUT)).not.toBeInTheDocument();
  });
  it('Verifica se o ícone de perfil tem a imagem correta', () => {
    const ICON_PROFILE = screen.getByAltText('icone-profile');
    expect(ICON_PROFILE).toHaveAttribute('src', 'profileIcon.svg');
  });
  it('Testa se ao clicar no ícone de profile é levado a página correta', () => {
    const { history } = renderWithRouterAndRedux(<Comidas />);
    const PROFILE_BUTTON = screen.getAllByAltText('icone-profile');
    fireEvent.click(PROFILE_BUTTON[1]);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
  it('Testa se ao clicar no botão de search o input para procurar aparece', () => {
    const BUTTON_SEARCH = screen.getByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    expect(SEARCH_INPUT).toBeInTheDocument();
  });
  it('Testa se é possível digitar no input-search', () => {
    const BUTTON_SEARCH = screen.getByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    userEvent.type(SEARCH_INPUT, 'TESTANDO ALÔ ALÔ, CÂMBIO');
    expect(SEARCH_INPUT).toHaveValue('TESTANDO ALÔ ALÔ, CÂMBIO');
  });
  it('Testa se a busca é feita corretamente por ingredientes', async () => {
    const BUTTON_SEARCH = screen.getByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    userEvent.type(SEARCH_INPUT, 'rice');
    const RADIO_INGREDIENTE = screen.getByTestId('ingredient-search-radio');
    const BUTTON_SEARCH_EXEC = screen.getByTestId(EXECSEARCHBTN);
    fireEvent.click(RADIO_INGREDIENTE);
    fireEvent.click(BUTTON_SEARCH_EXEC);
    const INGREDIENT_CARDS = await screen.findAllByTestId(/-recipe-card/);
    expect(INGREDIENT_CARDS.length).toBe(NUMBER_CARDS);
  });
  it('Testa se a busca é feita corretaente por nome', async () => {
    const BUTTON_SEARCH = screen.getByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    userEvent.type(SEARCH_INPUT, 'soup');
    const RADIO_INGREDIENTE = screen.getByTestId('name-search-radio');
    const BUTTON_SEARCH_EXEC = screen.getByTestId(EXECSEARCHBTN);
    fireEvent.click(RADIO_INGREDIENTE);
    fireEvent.click(BUTTON_SEARCH_EXEC);
    const INGREDIENT_CARDS = await screen.findAllByTestId(/-recipe-card/);
    expect(INGREDIENT_CARDS.length).toBe(NUMBER_CARDS_NAME);
  });
  it('Testa se a buscar é feita corretamente pela primeira letra', async () => {
    const BUTTON_SEARCH = screen.getByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    userEvent.type(SEARCH_INPUT, 's');
    const RADIO_INGREDIENTE = screen.getByTestId('first-letter-search-radio');
    const BUTTON_SEARCH_EXEC = screen.getByTestId(EXECSEARCHBTN);
    fireEvent.click(RADIO_INGREDIENTE);
    fireEvent.click(BUTTON_SEARCH_EXEC);
    const INGREDIENT_CARDS = await screen.findAllByTestId(/-recipe-card/);
    expect(INGREDIENT_CARDS.length).toBe(NUMBER_CARDS_NAME);
  });
  it('Testa se aparece um alerta ao digitar mais de uma letra', async () => {
    // source Link: https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const BUTTON_SEARCH = screen.getByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    userEvent.type(SEARCH_INPUT, 'soup');
    const RADIO_INGREDIENTE = screen.getByTestId('first-letter-search-radio');
    const BUTTON_SEARCH_EXEC = screen.getByTestId(EXECSEARCHBTN);
    fireEvent.click(RADIO_INGREDIENTE);
    fireEvent.click(BUTTON_SEARCH_EXEC);
    expect(window.alert).toBeCalled();
  });
  it('Se for encontrado apenas uma receita é levado a tela de detalhes', async () => {
    const { history } = renderWithRouterAndRedux(<Comidas />);
    const BUTTON_SEARCH = screen.getAllByTestId(SEARCHTOPBTN);
    fireEvent.click(BUTTON_SEARCH[0]);
    const SEARCH_INPUT = screen.getByTestId(SEARCHINPUT);
    userEvent.type(SEARCH_INPUT, 'arrabiata');
    const RADIO_NAME = screen.getByTestId('name-search-radio');
    const BUTTON_SEARCH_EXEC = screen.getByTestId(EXECSEARCHBTN);
    fireEvent.click(RADIO_NAME);
    fireEvent.click(BUTTON_SEARCH_EXEC);
    history.push('/comidas/52771');
    expect(history.location.pathname).toBe('/comidas/52771');
  });
});

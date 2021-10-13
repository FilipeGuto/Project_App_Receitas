import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import Comidas from '../pages/Comidas';
import App from '../App';

const FOOTER = 'footer';
const DRINK_BTN = 'drinks-bottom-btn';
const EXPLORE_BTN = 'explore-bottom-btn';
const MEAL_BTN = 'food-bottom-btn';

describe('Footer test', () => {
  test('Se o footer foi renderizado com os botões', () => {
    renderWithRouterAndRedux(<Comidas />);

    const footer = screen.getByTestId(FOOTER);
    const drink = screen.getByTestId(DRINK_BTN);
    const explore = screen.getByTestId(EXPLORE_BTN);
    const meal = screen.getByTestId(MEAL_BTN);

    expect(footer).toBeInTheDocument();
    expect(drink).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(meal).toBeInTheDocument();
  });

  test('Se o footer esta no fim da página', () => {
    renderWithRouterAndRedux(<Comidas />);

    const footer = screen.getByTestId(FOOTER);

    expect(footer.classList).toContain('app-footer');
  });

  test('Se o footer aparece nas páginas correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();

    history.push('/comidas');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/bebidas');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push(`/comidas/${'peixe'}/in-progress`);
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();

    history.push(`/bebidas/${'agua'}/in-progress`);
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();

    history.push(`/comidas/${'peixe'}`);
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();

    history.push(`/bebidas/${'agua'}`);
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();

    history.push('/explorar');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/explorar/comidas');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/explorar/bebidas');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/explorar/comidas/ingredientes');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/explorar/bebidas/ingredientes');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/explorar/comidas/area');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/perfil');
    expect(screen.queryByTestId(FOOTER)).toBeInTheDocument();

    history.push('/receitas-feitas');
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();

    history.push('/receitas-favoritas');
    expect(screen.queryByTestId(FOOTER)).not.toBeInTheDocument();
  });

  test('Se os botões estão direcionando para a página certa', () => {
    const { history } = renderWithRouterAndRedux(<Comidas />);

    const footer = screen.getByTestId(FOOTER);
    const drink = screen.getByTestId(DRINK_BTN);
    const explore = screen.getByTestId(EXPLORE_BTN);
    const meal = screen.getByTestId(MEAL_BTN);
    let path;

    expect(footer).toBeInTheDocument();

    userEvent.click(drink);
    path = history.location.pathname;
    expect(path).toBe('/bebidas');
    expect(footer).toBeInTheDocument();

    userEvent.click(explore);
    path = history.location.pathname;
    expect(path).toBe('/explorar');
    expect(footer).toBeInTheDocument();

    userEvent.click(meal);
    path = history.location.pathname;
    expect(path).toBe('/comidas');
    expect(footer).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import NotFound from '../pages/NotFound';
import App from '../App';

describe('1. Página Not Found', () => {
  test('1.1. Renderiza a mensagem de Not Found', () => {
    renderWithRouterAndRedux(<NotFound />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
  test('1.2. Quando entra em uma rota inexistente direciona para Not Found', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/xablau');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});

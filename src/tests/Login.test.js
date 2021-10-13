import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';

const EMAIL_TESTID = 'email-input';
const EMAIL_VALUE = 'test@email.com';
const PASSWORD_TESTID = 'password-input';
const PASSWORD_VALUE = '1234567';
const BUTTON_TESTID = 'login-submit-btn';

describe('Login tests', () => {
  test('Deveria aparecer na tela; email, password, botão.', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Se é possivel interagir com os inputs', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);

    userEvent.type(email, EMAIL_VALUE);
    expect(email.value).toBe(EMAIL_VALUE);
    userEvent.type(password, PASSWORD_VALUE);
    expect(password.value).toBe(PASSWORD_VALUE);
  });

  test('Se as condiçẽes do botão etão funcionando', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    expect(button.disabled).toBeTruthy();
    userEvent.type(email, 'abc');
    expect(button.disabled).toBeTruthy();
    userEvent.type(password, '123');
    expect(button.disabled).toBeTruthy();
  });

  test(`Se a URL da página é alterada e se informações são adicionada
    no localStorage após o click no botão`, () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_TESTID);
    const password = screen.getByTestId(PASSWORD_TESTID);
    const button = screen.getByTestId(BUTTON_TESTID);

    userEvent.type(email, EMAIL_VALUE);
    userEvent.type(password, PASSWORD_VALUE);
    expect(button.disabled).toBeFalsy();
    userEvent.click(button);

    const path = history.location.pathname;
    expect(path).toBe('/comidas');

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = localStorage.getItem('user');

    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
    expect(user).toBe('{"email":"test@email.com"}');
  });
});

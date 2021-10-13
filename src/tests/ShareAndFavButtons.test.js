import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import App from '../App';
import recipes from './support/RecipesExample';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const { recipeMeal } = recipes;
const SHARE_BTN = 'share-btn';
const FAV_BTN = 'favorite-btn';
const URL = '/comidas/52771/in-progress';

describe('Favorite and share button tests', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ meals: [recipeMeal] }),
    }));

    await act(async () => {
      renderWithRouterAndRedux(<App />, {
        initialEntries: [URL],
      });
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('Se os botão de compartilhar está funcionnado corretamente', () => {
    const shareBtn = screen.getByTestId(SHARE_BTN);

    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
      // Referencia de como lidar com o clipborad:
      // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
    });

    navigator.clipboard.writeText = jest.fn((url) => url);

    userEvent.click(shareBtn);
    expect(screen.getByText('Link copiado!')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toBeCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/comidas/52771');
  });

  test('Se o botão de favoritar está funcionnado corretamente ', async () => {
    const favBtn = screen.getByTestId(FAV_BTN);

    expect(favBtn.firstChild.src).toBe(`http://localhost/${whiteHeartIcon}`);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');

    userEvent.click(favBtn);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].id).toBe('52771');
    expect(favBtn.firstChild.src).toBe(`http://localhost/${blackHeartIcon}`);

    userEvent.click(favBtn);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');

    userEvent.click(favBtn);

    await act(async () => {
      renderWithRouterAndRedux(<App />, { initialEntries: [URL] });
    });

    expect(favBtn.firstChild.src).toBe(`http://localhost/${blackHeartIcon}`);
    userEvent.click(favBtn);
    expect(favBtn.firstChild.src).toBe(`http://localhost/${whiteHeartIcon}`);

    await act(async () => {
      renderWithRouterAndRedux(<App />, { initialEntries: [URL] });
    });

    expect(favBtn.firstChild.src).toBe(`http://localhost/${whiteHeartIcon}`);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  });
});

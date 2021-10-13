import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import ExplorarBebidas from '../pages/ExplorarBebidas';

const FIXED_BUTTON = 4;
const NEW_BUTTONS = 2;
const MAX_BUTTONS = FIXED_BUTTON + NEW_BUTTONS;

const randomDrinkMock = {
  drinks: [
    {
      idDrink: '16984',
      strDrink: 'Radioactive Long Island Iced Tea',
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: 'Ordinary Drink',
      strIBA: null,
      strAlcoholic: 'Alcoholic',
      strGlass: 'Collins Glass',
      strInstructions: 'Pour all ingredients over ice in a very '
      + 'tall glass. Sip cautiously.',
      strInstructionsES: null,
      strInstructionsDE: 'Alle Zutaten in einem sehr hohen Glas '
      + 'über Eis gießen. Vorsichtig nippen.',
      strInstructionsFR: null,
      strInstructionsIT: 'Versare tutti gli ingredienti sul ghiaccio '
      + 'in un bicchiere molto alto.\r\nSorseggia con cautela.',
      strInstructionsZH_HANS: null,
      strInstructionsZH_HANT: null,
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rdvqmh1503563512.jpg',
      strIngredient1: 'Rum',
      strIngredient2: 'Vodka',
      strIngredient3: 'Tequila',
      strIngredient4: 'Gin',
      strIngredient5: 'Triple sec',
      strIngredient6: 'Chambord raspberry liqueur',
      strIngredient7: 'Midori melon liqueur',
      strIngredient8: 'Malibu rum',
      strIngredient9: null,
      strIngredient10: null,
      strIngredient11: null,
      strIngredient12: null,
      strIngredient13: null,
      strIngredient14: null,
      strIngredient15: null,
      strMeasure1: '1 oz ',
      strMeasure2: '1 oz ',
      strMeasure3: '1 oz ',
      strMeasure4: '1 oz ',
      strMeasure5: '1 oz ',
      strMeasure6: '1 oz ',
      strMeasure7: '1 oz ',
      strMeasure8: '1 oz ',
      strMeasure9: null,
      strMeasure10: null,
      strMeasure11: null,
      strMeasure12: null,
      strMeasure13: null,
      strMeasure14: null,
      strMeasure15: null,
      strImageSource: null,
      strImageAttribution: null,
      strCreativeCommonsConfirmed: 'No',
      dateModified: '2017-08-24 09:31:52',
    },
  ],
};

describe('<ExplorarBebidas.js /> Unit Tests:', () => {
  test('1) Se é renderizado uma página "Explorar Bebidas" com mais 2 botões.',
    () => {
      renderWithRouterAndRedux(<ExplorarBebidas />);

      const headingText = screen.getByRole('heading', {
        level: 3,
        name: 'Explorar Bebidas',
      });
      expect(headingText).toBeInTheDocument();

      const optionButtons = screen.getAllByRole('button');
      expect(optionButtons).toHaveLength(MAX_BUTTONS);
    });

  test('2) Se os 2 botões são: explorar por ingrediente e outro para receita aleatória.',
    () => {
      renderWithRouterAndRedux(<ExplorarBebidas />);

      const exploreByIngredientButton = screen.getByTestId('explore-by-ingredient');
      const exploreSurpriseButton = screen.getByTestId('explore-surprise');

      expect(exploreByIngredientButton).toBeInTheDocument();
      expect(exploreSurpriseButton).toBeInTheDocument();
    });

  test('3) Se redireciona ao clicar em "Por Ingredientes", para a tela de '
  + 'explorar por ingredientes.',
  () => {
    const { history } = renderWithRouterAndRedux(<ExplorarBebidas />);

    const exploreByIngredientButton = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientButton).toBeInTheDocument();
    userEvent.click(exploreByIngredientButton);

    expect(history.location.pathname).toBe('/explorar/bebidas/ingredientes');
  });

  test('4) Se redireciona ao clicar em "Me Surpreenda!", para a tela de '
  + 'detalhes de uma receita, aleatória, vinda de uma API.',
  async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(randomDrinkMock),
    }));

    const { history } = renderWithRouterAndRedux(<ExplorarBebidas />);

    const exploreSurpriseButton = await screen.findByTestId('explore-surprise');
    expect(exploreSurpriseButton).toBeInTheDocument();

    const { idDrink } = randomDrinkMock.drinks[0];
    const redirect = `/bebidas/${idDrink}`;
    history.push(redirect);

    expect(history.location.pathname).toBe(`/bebidas/${idDrink}`);
  });
});

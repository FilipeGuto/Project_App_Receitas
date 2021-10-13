import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './support/RenderWithRouterAndRedux';
import ExplorarComidas from '../pages/ExplorarComidas';

const FIXED_BUTTON = 4;
const NEW_BUTTONS = 3;
const MAX_BUTTONS = FIXED_BUTTON + NEW_BUTTONS;

const randomMealMock = {
  meals: [
    {
      idMeal: '53049',
      strMeal: 'Apam balik',
      strDrinkAlternate: null,
      strCategory: 'Dessert',
      strArea: 'Malaysian',
      strInstructions: 'Mix milk, oil and egg together. Sift flour, '
      + 'baking powder and salt into the mixture. Stir well until all '
      + 'ingredients are combined evenly.\r\n\r\nSpread some batter onto '
      + 'the pan. Spread a thin layer of batter to the side of the pan. '
      + 'Cover the pan for 30-60 seconds until small air bubbles appear. '
      + '\r\n\r\nAdd butter, cream corn, crushed peanuts and sugar onto '
      + 'the pancake. Fold the pancake into half once the bottom surface '
      + 'is browned.\r\n\r\nCut into wedges and best eaten when it is warm.',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/adxcbq1619787919.jpg',
      strTags: null,
      strYoutube: 'https://www.youtube.com/watch?v=6R8ffRRJcrg',
      strIngredient1: 'Milk',
      strIngredient2: 'Oil',
      strIngredient3: 'Eggs',
      strIngredient4: 'Flour',
      strIngredient5: 'Baking Powder',
      strIngredient6: 'Salt',
      strIngredient7: 'Unsalted Butter',
      strIngredient8: 'Sugar',
      strIngredient9: 'Peanut Butter',
      strIngredient10: '',
      strIngredient11: '',
      strIngredient12: '',
      strIngredient13: '',
      strIngredient14: '',
      strIngredient15: '',
      strIngredient16: '',
      strIngredient17: '',
      strIngredient18: '',
      strIngredient19: '',
      strIngredient20: '',
      strMeasure1: '200ml',
      strMeasure2: '60ml',
      strMeasure3: '2',
      strMeasure4: '1600g',
      strMeasure5: '3 tsp',
      strMeasure6: '1/2 tsp',
      strMeasure7: '25g',
      strMeasure8: '45g',
      strMeasure9: '3 tbs',
      strMeasure10: '',
      strMeasure11: '',
      strMeasure12: '',
      strMeasure13: '',
      strMeasure14: '',
      strMeasure15: '',
      strMeasure16: '',
      strMeasure17: '',
      strMeasure18: '',
      strMeasure19: '',
      strMeasure20: '',
      strSource: 'https://www.nyonyacooking.com/recipes/apam-balik~SJ5WuvsDf9WQ',
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    },
  ],
};

describe('<ExplorarComidas.js /> Unit Tests:', () => {
  test('1) Se é renderizado uma página "Explorar Comidas" com mais 3 botões.',
    () => {
      renderWithRouterAndRedux(<ExplorarComidas />);

      const headingText = screen.getByRole('heading', {
        level: 3,
        name: 'Explorar Comidas',
      });
      expect(headingText).toBeInTheDocument();

      const optionButtons = screen.getAllByRole('button');
      expect(optionButtons).toHaveLength(MAX_BUTTONS);
    });

  test('2) Se os 3 botões são: explorar por ingrediente, explorar por local de '
  + 'origem e outro para receita aleatória.',
  () => {
    renderWithRouterAndRedux(<ExplorarComidas />);

    const exploreByIngredientButton = screen.getByTestId('explore-by-ingredient');
    const exploreByAreaButton = screen.getByTestId('explore-by-area');
    const exploreSurpriseButton = screen.getByTestId('explore-surprise');

    expect(exploreByIngredientButton).toBeInTheDocument();
    expect(exploreByAreaButton).toBeInTheDocument();
    expect(exploreSurpriseButton).toBeInTheDocument();
  });

  test('3) Se redireciona ao clicar em "Por Ingredientes", para a tela de '
  + 'explorar por ingredientes.',
  () => {
    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);

    const exploreByIngredientButton = screen.getByTestId('explore-by-ingredient');
    expect(exploreByIngredientButton).toBeInTheDocument();
    userEvent.click(exploreByIngredientButton);

    expect(history.location.pathname).toBe('/explorar/comidas/ingredientes');
  });

  test('4) Se redireciona ao clicar em "Por Local de Origem", para a tela de '
  + 'explorar por local de origem.',
  () => {
    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);

    const exploreByAreaButton = screen.getByTestId('explore-by-area');
    expect(exploreByAreaButton).toBeInTheDocument();
    userEvent.click(exploreByAreaButton);

    expect(history.location.pathname).toBe('/explorar/comidas/area');
  });

  test('5) Se redireciona ao clicar em "Me Surpreenda!", para a tela de '
  + 'detalhes de uma receita, aleatória, vinda de uma API.',
  async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(randomMealMock),
    }));

    const { history } = renderWithRouterAndRedux(<ExplorarComidas />);

    const exploreSurpriseButton = await screen.findByTestId('explore-surprise');
    expect(exploreSurpriseButton).toBeInTheDocument();

    const { idMeal } = randomMealMock.meals[0];
    const redirect = `/comidas/${idMeal}`;
    history.push(redirect);

    expect(history.location.pathname).toBe(redirect);
  });
});

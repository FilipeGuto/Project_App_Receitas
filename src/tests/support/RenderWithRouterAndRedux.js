import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialEntries = ['/'],
    initialState = {},
  } = {},
) => {
  const history = createMemoryHistory({ initialEntries });
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return ({
    ...render(
      <Router
        history={ history }
      >
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  });
};

export default renderWithRouterAndRedux;

// Fiz com ajuda da pagina de conteudos da Trybe. Bloco 16.5.

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../store/slices';

interface RenderWithRouterAndStoreOptions {
  initialState?: any;
  route?: string;
}

export function renderWithRouterAndStore(
  component: React.ReactElement,
  options: RenderWithRouterAndStoreOptions = {}
) {
  const { initialState, route = '/' } = options;

  const store = configureStore({ reducer: rootReducer, preloadedState: { ...initialState, user: { key: 'any' } } });

  const renderedComponent = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </Provider>
  );

  return {
    ...renderedComponent,
    store,
    route: options.route,
  };
}

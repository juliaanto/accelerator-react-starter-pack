import { makeFakeGuitar, makeFakeReviews } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

import ProductScreen from './product-screen';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeReviews = makeFakeReviews();
const fakeGuitar = makeFakeGuitar();

describe('Component: ProductScreen', () => {

  it('should render correctly', () => {
    const store = mockStore({
      DATA: { comments: fakeReviews, currentGuitar: fakeGuitar },
      USER: {guitarsInCart: []},
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});

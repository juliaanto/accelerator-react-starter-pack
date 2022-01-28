import { render, screen } from '@testing-library/react';

import CartScreen from './cart-screen';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CartScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {guitarsInCart: []},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartScreen />
        </Router>
      </Provider>);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Всего:')).toBeInTheDocument();
    expect(screen.getByText('Скидка:')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });
});

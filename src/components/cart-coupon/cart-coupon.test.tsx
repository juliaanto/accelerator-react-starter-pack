import { render, screen } from '@testing-library/react';

import CartCoupon from './cart-coupon';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CartCoupon', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartCoupon />
        </Router>
      </Provider>);

    expect(screen.getByText('Промокод на скидку')).toBeInTheDocument();
    expect(screen.getByText('Введите свой промокод, если он у вас есть.')).toBeInTheDocument();
    expect(screen.getByText('Промокод')).toBeInTheDocument();
    expect(screen.getByText('Применить')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import CartItem from './cart-item';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { getPriceFormatted } from '../../utils/guitar';
import { makeFakeGuitar } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {guitarsInCart: []},
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <CartItem guitar={fakeGuitar} />
        </Router>
      </Provider>);

    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeGuitar.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(getPriceFormatted(fakeGuitar.price))).toBeInTheDocument();
  });
});

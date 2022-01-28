import { render, screen } from '@testing-library/react';

import ModalCartDelete from './modal-cart-delete';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { getPriceFormatted } from '../../utils/guitar';
import { makeFakeGuitar } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();

describe('Component: ModalCartDelete', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {guitarsInCart: []},
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalCartDelete guitar={fakeGuitar} onCloseClick={jest.fn()} />
        </Router>
      </Provider>);

    expect(screen.getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(screen.getByText(`Гитара ${fakeGuitar.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeGuitar.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText(getPriceFormatted(fakeGuitar.price))).toBeInTheDocument();
    expect(screen.getByText('Удалить товар')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});

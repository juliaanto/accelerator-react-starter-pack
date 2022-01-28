import { render, screen } from '@testing-library/react';

import ModalSuccessAdd from './modal-success-add';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ModalSuccessAdd', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessAdd onCloseClick={jest.fn()} />
        </Router>
      </Provider>);

    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(screen.getByText('Перейти в корзину')).toBeInTheDocument();
    expect(screen.getByText('Продолжить покупки')).toBeInTheDocument();
  });
});

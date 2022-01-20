import { render, screen } from '@testing-library/react';

import ModalReview from './modal-review';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitar } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeGuitar = makeFakeGuitar();

describe('Component: ModalReview', () => {
  it('should render correctly', () => {
    const store = mockStore({});

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview handleCloseClick={jest.fn()} guitarId={fakeGuitar.id} guitarName={fakeGuitar.name}/>
        </Router>
      </Provider>);

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByText('Ваше Имя')).toBeInTheDocument();
    expect(screen.getByText('Ваша Оценка')).toBeInTheDocument();
    expect(screen.getByText('Достоинства')).toBeInTheDocument();
    expect(screen.getByText('Недостатки')).toBeInTheDocument();
    expect(screen.getByText('Комментарий')).toBeInTheDocument();
    expect(screen.getByText('Отправить отзыв')).toBeInTheDocument();
  });
});

import { Order, SortBy } from '../../const';
import { render, screen } from '@testing-library/react';

import Filter from './filter';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeGuitars } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Filter', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {  guitars: makeFakeGuitars(), guitarsCount: makeFakeGuitars().length, initialGuitars: makeFakeGuitars(), isDataLoaded: true},
      PARAMETERS: {  sort: SortBy.Unknown, order: Order.Unknown},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Фильтр/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Минимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Максимальная цена/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип гитар/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Акустические гитары/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Электрогитары/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Укулеле/i)).toBeInTheDocument();
    expect(screen.getByText(/Количество струн/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/4/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/6/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/7/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/12/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('priceMin'), '2000');
    expect(screen.getByDisplayValue(/2000/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('priceMax'), '10000');
    expect(screen.getByDisplayValue(/10000/i)).toBeInTheDocument();
  });
});

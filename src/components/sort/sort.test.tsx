import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {createMemoryHistory} from 'history';
import Sort from './sort';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Order, SortBy } from '../../const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  PARAMETERS: { sort: SortBy.Unknown, order: Order.Unknown },
});

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});

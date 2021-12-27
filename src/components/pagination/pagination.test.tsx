import {Route, Router, Switch} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import Pagination from './pagination';
import {Provider} from 'react-redux';
import { Order, SortBy } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeGuitars } from '../../utils/mocks';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: { guitars: makeFakeGuitars(), guitarsCount: makeFakeGuitars().length, initialGuitars: makeFakeGuitars() },
  PARAMETERS: { sort: SortBy.Unknown, order: Order.Unknown },
});

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Pagination />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });

  it('should redirect to /catalog/page_:pageNumber when user clicked to link', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/catalog/page_2" exact>
              <h1>This is page 2</h1>
            </Route>
            <Route>
              <Pagination />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is page 2/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/2/i));
    expect(screen.getByText(/This is page 2/i)).toBeInTheDocument();
  });
});

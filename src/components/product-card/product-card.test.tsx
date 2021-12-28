import {Route, Router, Switch} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import ProductCard from './product-card';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitar } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: { comments: [] },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductCard guitar={makeFakeGuitar()} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', () => {
    history.push('/fake');
    const mockGuitar = makeFakeGuitar();

    const store = mockStore({
      DATA: { comments: [] },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={`/product/${mockGuitar.id}`} exact>
              <h1>This is product page</h1>
            </Route>
            <Route>
              <ProductCard guitar={mockGuitar} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Подробнее/i));
    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});

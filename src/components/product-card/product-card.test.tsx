import {Route, Router, Switch} from 'react-router-dom';
import {render, screen} from '@testing-library/react';

import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import { makeFakeGuitar } from '../../utils/mocks';
import ProductCard from './product-card';

const history = createMemoryHistory();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ProductCard guitar={makeFakeGuitar()} />
      </Router>,
    );

    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });

  it('should redirect to product page when user clicked to link', () => {
    history.push('/fake');
    const mockGuitar = makeFakeGuitar();
    render(
      <Router history={history}>
        <Switch>
          <Route path={`/product/${mockGuitar.id}`} exact>
            <h1>This is product page</h1>
          </Route>
          <Route>
            <ProductCard guitar={mockGuitar} />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is product page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Подробнее/i));
    expect(screen.getByText(/This is product page/i)).toBeInTheDocument();
  });
});

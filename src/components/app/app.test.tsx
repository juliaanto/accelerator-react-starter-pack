import {AppRoute, Order, SortBy} from '../../const';
import {render, screen} from '@testing-library/react';

import App from './app';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import { makeFakeGuitars } from '../../utils/mocks';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {  guitars: makeFakeGuitars(), guitarsCount: 0, initialGuitars: [], isDataLoaded: true},
  PARAMETERS: {  sort: SortBy.Unknown, order: Order.Unknown},
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "MainScreen" when user navigate to "/catalog/page_:pageNumber"', () => {
    history.push(AppRoute.Catalog);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
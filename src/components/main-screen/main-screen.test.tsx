import {render, screen} from '@testing-library/react';

import MainScreen from './main-screen';
import { Provider } from 'react-redux';
import {Router} from 'react-router-dom';
import { SortBy } from '../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  DATA: { guitars: [], initialGuitars: [] },
  PARAMETERS: { sort: SortBy.Unknown },
});

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  });

});
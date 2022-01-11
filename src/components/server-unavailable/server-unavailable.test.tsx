import {render, screen} from '@testing-library/react';

import {Router} from 'react-router-dom';
import ServerUnavailable from './server-unavailable';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: ServerUnavailable', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ServerUnavailable />
      </Router>);

    expect(screen.getByText(/Сервер недоступен/i)).toBeInTheDocument();
    expect(screen.getByText('Попробовать снова')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});

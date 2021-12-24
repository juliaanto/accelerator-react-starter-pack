import { render, screen } from '@testing-library/react';

import Header from './header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Header />
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });
});
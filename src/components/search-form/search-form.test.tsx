import { render, screen } from '@testing-library/react';

import { Router } from 'react-router-dom';
import SearchForm from './search-form';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <SearchForm />
      </Router>);

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('search'), 'Честер');

    expect(screen.getByDisplayValue(/Честер/i)).toBeInTheDocument();
  });
});

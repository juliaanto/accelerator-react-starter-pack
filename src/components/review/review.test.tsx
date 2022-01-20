import { render, screen } from '@testing-library/react';

import Review from './review';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import { makeFakeReview } from '../../utils/mocks';

const history = createMemoryHistory();

describe('Component: Review', () => {
  it('should render correctly', () => {

    const fakeReview = makeFakeReview();

    render(
      <Router history={history}>
        <Review review={fakeReview} />
      </Router>);

    expect(screen.getByText('Рейтинг:')).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
  });
});

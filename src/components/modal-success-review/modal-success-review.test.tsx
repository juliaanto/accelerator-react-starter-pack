import { render, screen } from '@testing-library/react';

import ModalSuccessReview from './modal-success-review';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: ModalSuccessReview', () => {
  it('should render correctly', () => {

    render(
      <Router history={history}>
        <ModalSuccessReview onCloseClick={jest.fn()} />
      </Router>);

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
    expect(screen.getByText('К покупкам!')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import { Router } from 'react-router-dom';
import Tabs from './tabs';
import {createMemoryHistory} from 'history';
import { makeFakeGuitar } from '../../utils/mocks';

const history = createMemoryHistory();

describe('Component: Tabs', () => {
  it('should render correctly', () => {

    const fakeGuitar = makeFakeGuitar();

    render(
      <Router history={history}>
        <Tabs product={fakeGuitar} />
      </Router>);

    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
  });
});

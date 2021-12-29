import { makeFakeGuitar, makeFakeGuitars } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

import ProductScreen from './product-screen';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const fakeGuitar = makeFakeGuitar();
const fakeGuitars = makeFakeGuitars();

describe('Component: ProductScreen', () => {

  it('should render correctly', () => {

    React.useState = jest.fn()
      .mockReturnValueOnce([fakeGuitar, {}])
      .mockReturnValueOnce([fakeGuitars, {}]);

    render(
      <Router history={history}>
        <ProductScreen />
      </Router>);

    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText('Тип:')).toBeInTheDocument();
    expect(screen.getByText('Количество струн:')).toBeInTheDocument();
    expect(screen.getByText('Цена:')).toBeInTheDocument();
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
  });
});

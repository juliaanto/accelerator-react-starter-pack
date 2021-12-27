import { render, screen } from '@testing-library/react';

import Footer from './footer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer />
      </Router>);

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByText(/О нас/i)).toBeInTheDocument();
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская в Санкт-Петербурге.Все инструменты проверены, отстроены и доведены до идеала!/i)).toBeInTheDocument();
    expect(screen.getByText(/Информация/i)).toBeInTheDocument();
    expect(screen.getByText(/Где купить?/i)).toBeInTheDocument();
    expect(screen.getByText(/Блог/i)).toBeInTheDocument();
    expect(screen.getByText(/Вопрос - ответ/i)).toBeInTheDocument();
    expect(screen.getByText(/Возврат/i)).toBeInTheDocument();
    expect(screen.getByText(/Сервис-центры/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
    expect(screen.getByText(/г. Санкт-Петербург, м. Невский проспект, ул. Казанская 6./i)).toBeInTheDocument();
    expect(screen.getByText(/Режим работы:/i)).toBeInTheDocument();
    expect(screen.getByText(/с 11:00 до 20:00/i)).toBeInTheDocument();
    expect(screen.getByText(/без выходных/i)).toBeInTheDocument();
  });
});

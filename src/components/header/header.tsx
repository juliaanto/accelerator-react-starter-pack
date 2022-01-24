import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import SearchForm from '../search-form/search-form';

function Header(): JSX.Element {
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link to="#" className="header__logo logo">
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"></img>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li><Link to="#" className="link main-nav__link link--current">Каталог</Link>
            </li>
            <li><Link to="#" className="link main-nav__link">Где купить?</Link>
            </li>
            <li><Link to="#" className="link main-nav__link">О компании</Link>
            </li>
          </ul>
        </nav>

        <SearchForm />

        <Link to={AppRoute.Cart} className="header__cart-link" aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg><span className="visually-hidden">Перейти в корзину</span><span className="header__cart-count">2</span>
        </Link>
      </div>
    </header>

  );
}

export default Header;

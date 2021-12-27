import { AppRoute } from '../../const';
import Filter from '../filter/filter';
import Footer from '../footer/footer';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import ProductCard from '../product-card/product-card';
import Sort from '../sort/sort';
import { getGuitars } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';

function MainScreen(): JSX.Element {
  const guitars = useSelector(getGuitars);

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to="#" className="link">Каталог</Link>
            </li>
          </ul>
          <div className="catalog">

            <Filter />

            <Sort />

            <div className="cards catalog__cards">
              {guitars.map((guitar) => (
                <ProductCard key={guitar.id} guitar={guitar}/>
              ))}
            </div>

            <Pagination />

          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}

export default MainScreen;

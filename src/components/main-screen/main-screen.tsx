import { ConnectedProps, connect } from 'react-redux';

import { AppRoute } from '../../const';
import Filter from '../filter/filter';
import Footer from '../footer/footer';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card';
import Sort from '../sort/sort';
import { State } from '../../types/state';
import { getGuitars } from '../../store/guitar-data/selectors';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MainScreen(props: PropsFromRedux): JSX.Element {
  const {guitars} = props;

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
              <a className="link">Каталог</a>
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

            <div className="pagination page-content__pagination">
              <ul className="pagination__list">
                <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href="1">1</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                </li>
                <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                </li>
                <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}

export {MainScreen};
export default connector(MainScreen);

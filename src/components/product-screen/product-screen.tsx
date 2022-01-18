import { APIRouteWithVariable, AppRoute, REVIEWS_COUNT, REVIEWS_STEP } from '../../const';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Comments } from '../../types/comment';
import Footer from '../footer/footer';
import { Guitar } from '../../types/guitar';
import Header from '../header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import RatingStars from '../rating-stars/rating-stars';
import Review from '../review/review';
import { State } from '../../types/state';
import Tabs from '../tabs/tabs';
import api from '../../services/api';
import { getCommentsCount } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';

function ProductScreen(): JSX.Element {
  const {id} = useParams<{id: string}>();

  const rateCount = useSelector((state: State) => getCommentsCount(state, Number(id)));

  const [product, setProduct] = useState<Guitar>();
  const [reviews, setReviews] = useState<Comments>([]);
  const [reviewsCount, setReviewsCount] = useState<number>(REVIEWS_COUNT);

  useEffect(() => {
    api.get<Guitar>(APIRouteWithVariable.GuitarById(Number(id))).then((response) => setProduct(response.data));
    api.get<Comments>(APIRouteWithVariable.CommentsByGuitarId(Number(id))).then((response) => setReviews(response.data));
  }, [id]);

  if (!product) {
    return <NotFoundScreen />;
  }

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{product.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Main}>Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Main}>Каталог</a>
            </li>
            <li className="breadcrumbs__item"><Link to="#" className="link">{product.name}</Link>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={product?.previewImg} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{product?.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

                <RatingStars rating={product.rating} width={14} height={14} />

                <span className="rate__count">{rateCount}</span>
                <span className="rate__message"></span>
              </div>

              <Tabs product={product} />

            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{String(product.price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽</p><Link to="#" className="button button--red button--big product-container__button">Добавить в корзину</Link>
            </div>
          </div>
          <section className="reviews">

            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <Link to="#" className="button button--red-border button--big reviews__sumbit-button">Оставить отзыв</Link>

            {reviews?.slice(0, reviewsCount).map((review) => (
              <Review key={review.id} review={review} />
            ))}

            {reviewsCount < reviews?.length ?
              <button
                className="button button--medium reviews__more-button"
                onClick={() => setReviewsCount(reviewsCount + REVIEWS_STEP)}
              >Показать еще отзывы
              </button>
              : ''}

            <Link to="#header" className="button button--up button--red-border button--big reviews__up-button">Наверх</Link>

          </section>
        </div>
      </main>

      <Footer />

    </div>

  );
}

export default ProductScreen;

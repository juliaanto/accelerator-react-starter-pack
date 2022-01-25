import { APIRouteWithVariable, AppLink, AppRoute, Hash, REVIEWS_COUNT, REVIEWS_STEP, Title } from '../../const';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SetStateAction, useEffect, useState } from 'react';
import { getCommentsCount, getCurrentGuitar } from '../../store/guitar-data/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { Comments } from '../../types/comment';
import Footer from '../footer/footer';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import RatingStars from '../rating-stars/rating-stars';
import Review from '../review/review';
import { State } from '../../types/state';
import Tabs from '../tabs/tabs';
import api from '../../services/api';
import { fetchCurrentGuitarAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';

function ProductScreen(): JSX.Element {
  const {id} = useParams<{id: string}>();

  const rateCount = useSelector((state: State) => getCommentsCount(state, Number(id)));
  const product = useSelector((state: State) => getCurrentGuitar(state));

  const dispatch = useDispatch();

  const hash = String(useLocation<string>().hash);

  if (product) {
    document.title = `${product.name} — ${Title.Main}`;
  }

  const [reviews, setReviews] = useState<Comments>([]);
  const [reviewsCount, setReviewsCount] = useState<number>(REVIEWS_COUNT);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState<boolean>(false);
  const [isModalSuccessReviewOpen, setIsModalSuccessReviewOpen] = useState<boolean>(false);
  const [isModalAddToCartOpen, setIsModalAddToCartOpen] = useState<boolean>(false);
  const [isModalSuccessAddToCartOpen, setIsModalSuccessAddToCartOpen] = useState<boolean>(false);
  const [disabledElements, setDisabledElements] = useState<Element[]>();

  useEffect(() => {
    dispatch(fetchCurrentGuitarAction(Number(id)));
    api.get<Comments>(APIRouteWithVariable.CommentsByGuitarId(Number(id))).then((response) => setReviews(response.data));
  }, [dispatch, id]);

  useEffect(() => {
    if (isModalReviewOpen) {
      return;
    }

    if (hash === Hash.Success) {
      setIsModalSuccessReviewOpen(true);
      dispatch(redirectToRoute(AppLink.ProductById(Number(id))));
    }

    return () => {
      setIsModalSuccessReviewOpen(false);
    };

  }, [dispatch, hash, id, isModalReviewOpen]);

  useEffect(() => {
    const modalElement = document.querySelector('.modal__content');

    if (isModalReviewOpen === true || isModalSuccessReviewOpen === true || isModalAddToCartOpen === true || isModalSuccessAddToCartOpen === true) {
      document.body.style.overflow = 'hidden';
      const currentDisabledElements: SetStateAction<Element[] | undefined> = [];

      document.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)').forEach((element) => {
        if (modalElement !== null && !modalElement.contains(element)) {
          element.setAttribute('tabIndex', '-1');
          currentDisabledElements.push(element);
        }
      });
      setDisabledElements(currentDisabledElements);
    } else {
      document.body.style.overflow = 'visible';
      disabledElements?.forEach((element) => {
        element.removeAttribute('tabIndex');
      });
      setDisabledElements([]);
    }

    return () => {
      document.body.style.overflow = 'visible';
    };

  }, [isModalReviewOpen, isModalSuccessReviewOpen, isModalAddToCartOpen, isModalSuccessAddToCartOpen]);

  document.addEventListener('scroll', () => {
    if (window.scrollY === 0) {
      setIsTopOfPage(true);
    } else {
      setIsTopOfPage(false);
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setReviewsCount(reviewsCount + REVIEWS_STEP);
    }
  });

  if (!product) {
    return <LoadingScreen />;
  }

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{product.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to="#" className="link">{product.name}</Link>
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
              <p className="product-container__price-info product-container__price-info--value">{String(product.price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽</p>
              <button
                className="button button--red button--big product-container__button"
                onClick={() => setIsModalAddToCartOpen(true)}
              >Добавить в корзину
              </button>
            </div>
          </div>
          <section className="reviews">

            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <button
              className="button button--red-border button--big reviews__sumbit-button"
              onClick={() => setIsModalReviewOpen(true)}
            >Оставить отзыв
            </button>

            {isModalReviewOpen ?
              <ModalReview onCloseClick={() => setIsModalReviewOpen(false)} guitarId={Number(id)} guitarName={product.name} />
              : ''}

            {isModalSuccessReviewOpen ?
              <ModalSuccessReview onCloseClick={() => setIsModalSuccessReviewOpen(false)} />
              : ''}

            {isModalAddToCartOpen ?
              <ModalCartAdd onCloseClick={() => setIsModalAddToCartOpen(false)} guitar={product} onSuccessAdd={() => setIsModalSuccessAddToCartOpen(true)}/>
              : ''}

            {isModalSuccessAddToCartOpen ?
              <ModalSuccessAdd onCloseClick={() => setIsModalSuccessAddToCartOpen(false)} />
              : ''}

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

            {isTopOfPage || reviews.length === 0 ? '' :
              <a href={`${AppLink.ProductById(Number(id))}#header`} className="button button--up button--red-border button--big reviews__up-button">Наверх</a>}

          </section>
        </div>
      </main>

      <Footer />

    </div>

  );
}

export default ProductScreen;

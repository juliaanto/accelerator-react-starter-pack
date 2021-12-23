import { APIRouteWithVariable, AppRoute } from '../../const';
import { useEffect, useState } from 'react';

import Footer from '../footer/footer';
import { Guitar } from '../../types/guitar';
import Header from '../header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import RatingStars from '../rating-stars/rating-stars';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function ProductScreen(): JSX.Element {
  const {id} = useParams<{id: string}>();

  const [product, setProduct] = useState<Guitar>();

  useEffect(() => {
    api.get<Guitar>(APIRouteWithVariable.GuitarById(Number(id))).then((response) => setProduct(response.data));
  }, [id]);

  if (!product) {
    return <NotFoundScreen />;
  }

  return (
    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Main}>Главная</a>
            </li>
            <li className="breadcrumbs__item"><a className="link" href={AppRoute.Main}>Каталог</a>
            </li>
            <li className="breadcrumbs__item"><a className="link">Товар</a>
            </li>
          </ul>
          <div className="product-container">
            <img className="product-container__img" src={product?.previewImg} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{product?.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

                <RatingStars rating={product.rating} />

                <span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tbody>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Артикул:</td>
                        <td className="tabs__value">{product.vendorCode}</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Тип:</td>
                        <td className="tabs__value">Электрогитара</td>
                      </tr>
                      <tr className="tabs__table-row">
                        <td className="tabs__title">Количество струн:</td>
                        <td className="tabs__value">{product.stringCount} струнная</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tabs__product-description hidden">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.</p>
                </div>
              </div>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{String(product.price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3><a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <div className="review">
              <div className="review__wrapper">
                <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
              </div>
              <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="rate__count"></span><span className="rate__message"></span>
              </div>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">Тугие колонки</p>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
            </div>
            <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
          </section>
        </div>
      </main>

      <Footer />

    </div>

  );
}

export default ProductScreen;
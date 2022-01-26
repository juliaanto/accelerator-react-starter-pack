import { AppLink, AppRoute } from '../../const';
import { SetStateAction, useEffect, useState } from 'react';

import { Guitar } from '../../types/guitar';
import { Link } from 'react-router-dom';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import RatingStars from '../rating-stars/rating-stars';
import { State } from '../../types/state';
import { getCommentsCount } from '../../store/guitar-data/selectors';
import { getGuitarsInCart } from '../../store/user-actions/selectors';
import { getPriceFormatted } from '../../utils/guitar';
import { useSelector } from 'react-redux';

type ProductCardProps = {
  guitar: Guitar;
}

function ProductCard(props: ProductCardProps): JSX.Element {
  const {guitar} = props;

  const rateCount = useSelector((state: State) => getCommentsCount(state, guitar.id));
  const guitarsInCart = useSelector((state: State) => getGuitarsInCart(state));

  const [isModalAddToCartOpen, setIsModalAddToCartOpen] = useState<boolean>(false);
  const [isModalSuccessAddToCartOpen, setIsModalSuccessAddToCartOpen] = useState<boolean>(false);
  const [disabledElements, setDisabledElements] = useState<Element[]>();

  const isGuitarInCart = () => (guitarsInCart.filter((guitarInCart) => guitarInCart.id === guitar.id)).length > 0;

  useEffect(() => {
    const modalElement = document.querySelector('.modal__content');

    if (isModalAddToCartOpen === true || isModalSuccessAddToCartOpen === true) {
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

  }, [isModalAddToCartOpen, isModalSuccessAddToCartOpen]);

  return (
    <div className="product-card">
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name}></img>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <RatingStars rating={guitar.rating} width={12} height={11} />

          <span className="rate__count">{rateCount}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{getPriceFormatted(guitar.price)}</p>
      </div>
      <div className="product-card__buttons">
        <Link to={AppLink.ProductById(guitar.id)} className="button button--mini">
          Подробнее
        </Link>

        {isGuitarInCart() ?
          <Link
            to={AppRoute.Cart}
            className="button button--red-border button--mini button--in-cart"
          >В Корзине
          </Link>
          :
          <Link
            to="#"
            className="button button--red button--mini button--add-to-cart"
            onClick={() => setIsModalAddToCartOpen(true)}
          >Купить
          </Link>}

      </div>

      {isModalAddToCartOpen ?
        <ModalCartAdd guitar={guitar} onCloseClick={() => setIsModalAddToCartOpen(false)}  onSuccessAdd={() => setIsModalSuccessAddToCartOpen(true)}/>
        : ''}

      {isModalSuccessAddToCartOpen ?
        <ModalSuccessAdd onCloseClick={() => setIsModalSuccessAddToCartOpen(false)}/>
        : ''}
    </div>
  );
}

export default ProductCard;

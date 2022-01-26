import { Key, LAST_GUITAR_QUANTITY, MAX_GUITARS_QUANTITY } from '../../const';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { addGuitarToCart, updateGuitarsInCart } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';

import { Guitar } from '../../types/guitar';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';
import { State } from '../../types/state';
import { getGuitarType } from '../../utils/guitarPage';
import { getGuitarsInCart } from '../../store/user-actions/selectors';

type CartItemProps = {
  guitar: Guitar;
}

function CartItem(props: CartItemProps): JSX.Element {
  const {guitar} = props;

  const dispatch = useDispatch();

  const [isModalDeleteFromCartOpen, setIsModalDeleteFromCartOpen] = useState<boolean>(false);
  const [disabledElements, setDisabledElements] = useState<Element[]>();

  const guitarsInCart = useSelector((state: State) => getGuitarsInCart(state));

  const quantityRef = useRef<HTMLInputElement | null>(null);

  const guitarsCount = (guitarsInCart.filter((guitarInCart) => guitarInCart.id === guitar.id)).length;

  useEffect(() => {
    const cartItemElement = document.querySelector(`[id='${guitar.id}']`);
    (cartItemElement?.querySelector('.quantity__input') as HTMLInputElement).value = String(guitarsCount);
  });

  useEffect(() => {
    const modalElement = document.querySelector('.modal__content');

    if (isModalDeleteFromCartOpen === true) {
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

  }, [isModalDeleteFromCartOpen]);

  const updateGuitarsQuantity = () => {
    if (Number(quantityRef.current?.value) > MAX_GUITARS_QUANTITY) {
      const quantityInputElement = document.querySelector('.quantity__input') as HTMLObjectElement;
      quantityInputElement.reportValidity();

    } else {
      const guitarIndex = guitarsInCart.indexOf(guitar);
      const updatedGuitars = guitarsInCart.filter((item) => item.id !== guitar.id);

      for (let i = 0; i < Number(quantityRef.current?.value); i++) {
        updatedGuitars.splice(guitarIndex, 0, guitar);
      }
      dispatch(updateGuitarsInCart(updatedGuitars));
    }
  };

  const handleQuantityInputKeyDown = (event: { key: string; }) => {
    if (event.key !== Key.Enter) {
      return;
    }

    if (Number(quantityRef.current?.value) === 0) {
      setIsModalDeleteFromCartOpen(true);
    } else {
      updateGuitarsQuantity();
    }

  };

  const handleBlurGuitarsQuantity = () => {
    if (Number(quantityRef.current?.value) === 0) {
      setIsModalDeleteFromCartOpen(true);
    } else {
      updateGuitarsQuantity();
    }
  };

  const handleRemoveGuitarClick = () => {
    if (guitarsCount === LAST_GUITAR_QUANTITY) {
      setIsModalDeleteFromCartOpen(true);
    } else {
      const deletedGuitarIndex = guitarsInCart.lastIndexOf(guitar);
      const updatedGuitars = guitarsInCart.slice();
      updatedGuitars.splice(deletedGuitarIndex, 1);
      dispatch(updateGuitarsInCart(updatedGuitars));
    }
  };

  return (
    <div className="cart-item" id={`${guitar.id}`}>
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={() => setIsModalDeleteFromCartOpen(true)}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={guitar.previewImg} width="55" height="130" alt={guitar.name} />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar.name}</p>
        <p className="product-info__info">Артикул: {guitar.vendorCode}</p>
        <p className="product-info__info">{getGuitarType(guitar.type)}, {guitar.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{String(guitar.price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleRemoveGuitarClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id="4-count"
          name="4-count"
          max="99"
          ref={quantityRef}
          onKeyDown={handleQuantityInputKeyDown}
          onBlur={handleBlurGuitarsQuantity}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={() => dispatch(addGuitarToCart(guitar))}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{String(guitar.price * guitarsCount).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽</div>

      {isModalDeleteFromCartOpen ?
        <ModalCartDelete guitar={guitar} onCloseClick={() => setIsModalDeleteFromCartOpen(false)}/>
        : ''}

    </div>

  );
}

export default CartItem;

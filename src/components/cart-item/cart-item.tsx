import { Key, MAX_GUITARS_QUANTITY } from '../../const';
import { addGuitarToCart, removeGuitarFromCart } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { getGuitarType } from '../../utils/guitarPage';
import { getGuitarsById } from '../../utils/cart';
import { getGuitarsInCart } from '../../store/user-actions/selectors';

type CartItemProps = {
  guitar: Guitar;
}

function CartItem(props: CartItemProps): JSX.Element {
  const {guitar} = props;

  const dispatch = useDispatch();

  const guitarsInCart = useSelector((state: State) => getGuitarsInCart(state));

  const quantityRef = useRef<HTMLInputElement | null>(null);

  const guitarsCount = (guitarsInCart.filter((guitarInCart) => guitarInCart.id === guitar.id)).length;

  useEffect(() => {
    const cartItemElement = document.querySelector(`[id='${guitar.id}']`);
    (cartItemElement?.querySelector('.quantity__input') as HTMLInputElement).value = String(guitarsCount);
  });

  const updateGuitarsQuantity = () => {
    if (Number(quantityRef.current?.value) > MAX_GUITARS_QUANTITY) {
      const quantityInputElement = document.querySelector('.quantity__input') as HTMLObjectElement;
      quantityInputElement.reportValidity();
    } else {
      const currentGuitars = getGuitarsById(guitarsInCart, guitar.id);
      currentGuitars.forEach((currentGuitar: Guitar) => dispatch(removeGuitarFromCart(currentGuitar)));
      for (let i = 0; i < Number(quantityRef.current?.value); i++) {
        dispatch(addGuitarToCart(guitar));
      }
    }
  };

  const handleQuantityInputKeyDown = (event: { key: string; }) => {
    if (event.key === Key.Enter) {
      updateGuitarsQuantity();
    }
  };

  return (
    <div className="cart-item" id={`${guitar.id}`}>
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить"><span className="button-cross__icon"></span><span className="cart-item__close-button-interactive-area"></span>
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
          onClick={() => dispatch(removeGuitarFromCart(guitar))}
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
          onBlur={updateGuitarsQuantity}
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
    </div>
  );
}

export default CartItem;

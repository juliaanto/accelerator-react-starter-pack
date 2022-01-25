/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef } from 'react';

import { Guitar } from '../../types/guitar';
import { State } from '../../types/state';
import { getGuitarType } from '../../utils/guitarPage';
import { getGuitarsInCart } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';

type CartItemProps = {
  guitar: Guitar;
}

function CartItem(props: CartItemProps): JSX.Element {
  const {guitar} = props;

  const guitarsInCart = useSelector((state: State) => getGuitarsInCart(state));

  const quantityRef = useRef<HTMLInputElement | null>(null);

  const guitarsCount = (guitarsInCart.filter((guitarInCart) => guitarInCart.id === guitar.id)).length;

  useEffect(() => {
    const cartItemElement = document.querySelector(`[id='${guitar.id}']`);
    (cartItemElement?.querySelector('.quantity__input') as HTMLInputElement).value = String(guitarsCount);
  });

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
        <button className="quantity__button" aria-label="Уменьшить количество">
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
        />
        <button className="quantity__button" aria-label="Увеличить количество">
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

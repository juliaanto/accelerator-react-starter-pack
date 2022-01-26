import { FormEvent, useRef } from 'react';

import { couponPostAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';

function CartCoupon(): JSX.Element {

  const dispatch = useDispatch();

  const couponRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (couponRef.current) {
      dispatch(couponPostAction({
        coupon: couponRef.current.value,
      }));
    }
  };

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        className="coupon__form"
        id="coupon-form"
        method="post"
        action="/"
        onSubmit={handleSubmit}
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            ref={couponRef}
          />
          <p className="form-input__message form-input__message--success">Промокод принят</p>
        </div>
        <button className="button button--big coupon__button">Применить</button>
      </form>
    </div>
  );
}

export default CartCoupon;

import { AppRoute, Title } from '../../const';
import { getCoupon, getGuitarsInCart } from '../../store/user-actions/selectors';
import { getTotalValue, getUniqueGuitars } from '../../utils/cart';

import CartCoupon from '../cart-coupon/cart-coupon';
import CartItem from '../cart-item/cart-item';
import Footer from '../footer/footer';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import { State } from '../../types/state';
import { getPriceFormatted } from '../../utils/guitar';
import { useSelector } from 'react-redux';

function CartScreen(): JSX.Element {
  document.title = Title.Cart;

  const guitarsInCart = useSelector((state: State) => getGuitarsInCart(state));
  const coupon = useSelector((state: State) => getCoupon(state));

  const totalValue = getTotalValue(guitarsInCart);
  const discountValue = totalValue * coupon / 100;
  const paymentValue = totalValue - discountValue;

  return (

    <div className="wrapper">

      <Header />

      <main className="page-content">
        <div className="container">
          <h1 className="title title--bigger page-content__title">Корзина</h1>
          <ul className="breadcrumbs page-content__breadcrumbs page-content__breadcrumbs--on-cart-page">
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to={AppRoute.Main} className="link">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link to="#" className="link">Корзина</Link>
            </li>
          </ul>
          <div className="cart">

            {getUniqueGuitars(guitarsInCart).map((cartItem) => (
              <CartItem key={cartItem.id} guitar={cartItem}/>
            ))}

            <div className="cart__footer">

              <CartCoupon />

              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{getPriceFormatted(totalValue)}</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className="cart__total-value cart__total-value--bonus">- {getPriceFormatted(discountValue)}</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">{getPriceFormatted(paymentValue)}</span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>

  );
}

export default CartScreen;

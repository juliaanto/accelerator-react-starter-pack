import { addGuitarToCart, applyCoupon, updateGuitarsInCart } from '../action';
import { makeFakeGuitar, makeFakeGuitars } from '../../utils/mocks';

import { userActions } from './user-actions';

const guitar = makeFakeGuitar();
const guitars = makeFakeGuitars();

describe('Reducer: userActions', () => {
  it('without additional parameters should return initial state', () => {
    expect(userActions(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitarsInCart: [], coupon: 0});
  });

  it('should update guitarsInCart by add guitar', () => {
    const state = {guitarsInCart: [], coupon: 0};
    expect(userActions(state, addGuitarToCart(guitar)))
      .toEqual({guitarsInCart: [guitar], coupon: 0});
  });

  it('should update guitarsInCart by update guitars count', () => {
    const state = {guitarsInCart: [], coupon: 0};
    expect(userActions(state, updateGuitarsInCart(guitars)))
      .toEqual({guitarsInCart: guitars, coupon: 0});
  });

  it('should update coupon by apply coupon', () => {
    const fakeCoupon = 25;
    const state = {guitarsInCart: [], coupon: 0};
    expect(userActions(state, applyCoupon(fakeCoupon)))
      .toEqual({guitarsInCart: [], coupon: fakeCoupon});
  });
});

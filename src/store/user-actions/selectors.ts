import { Guitars } from '../../types/guitar';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitarsInCart = (state: State): Guitars => state[NameSpace.User].guitarsInCart;
export const getCoupon = (state: State): number => state[NameSpace.User].coupon;

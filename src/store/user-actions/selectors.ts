import { Guitars } from '../../types/guitar';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitarsInCart = (state: State): Guitars => state[NameSpace.user].guitarsInCart;

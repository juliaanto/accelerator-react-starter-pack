import { Order, SortBy } from '../../const';

import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getSort = (state: State): SortBy => state[NameSpace.paramaters].sort;
export const getOrder = (state: State): Order => state[NameSpace.paramaters].order;

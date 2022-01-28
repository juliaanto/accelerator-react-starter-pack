import { Order, SortBy } from '../../const';

import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getSort = (state: State): SortBy => state[NameSpace.Parameters].sort;
export const getOrder = (state: State): Order => state[NameSpace.Parameters].order;

import { Order, SortBy } from '../const';

import { ActionType } from '../types/action';
import { Guitars } from '../types/guitar';

export const loadGuitars = (guitars: Guitars) => ({
  type: ActionType.LoadGuitars,
  payload: {
    guitars,
  },
} as const);

export const loadGuitarsCount = (guitars: Guitars) => ({
  type: ActionType.LoadGuitarsCount,
  payload: {
    guitars,
  },
} as const);

export const loadInitialGuitars = (initialGuitars: Guitars) => ({
  type: ActionType.LoadInitialGuitars,
  payload: {
    initialGuitars,
  },
} as const);

export const redirectToRoute = (url: string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const setSort = (sort: SortBy) => ({
  type: ActionType.SetSort,
  payload: sort,
} as const);

export const setOrder = (order: Order) => ({
  type: ActionType.SetOrder,
  payload: order,
} as const);

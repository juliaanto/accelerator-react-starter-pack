import { AppRoute, Order, SortBy } from '../const';

import { ActionType } from '../types/action';
import { Guitars } from '../types/guitar';
import { createAction } from '@reduxjs/toolkit';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);

export const loadGuitarsCount = createAction(
  ActionType.LoadGuitarsCount,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);

export const loadInitialGuitars = createAction(
  ActionType.LoadInitialGuitars,
  (initialGuitars: Guitars) => ({
    payload: {
      initialGuitars,
    },
  }),
);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const setSort = createAction(
  ActionType.SetSort,
  (sort: SortBy) => ({
    payload: {
      sort,
    },
  }),
);

export const setOrder = createAction(
  ActionType.SetOrder,
  (order: Order) => ({
    payload: {
      order,
    },
  }),
);

import { AppRoute, Order, SortBy } from '../const';
import { Guitar, Guitars } from '../types/guitar';

import { ActionType } from '../types/action';
import { Comments } from '../types/comment';
import { createAction } from '@reduxjs/toolkit';

export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);

export const loadComments = createAction(
  ActionType.LoadComments,
  (comments: Comments) => ({
    payload: {
      comments,
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
  (url: AppRoute | string) => ({
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

export const loadCurrentGuitar = createAction(
  ActionType.LoadCurrentGuitar,
  (guitar: Guitar) => ({
    payload: {
      guitar,
    },
  }),
);

export const addGuitarToCart = createAction(
  ActionType.AddGuitarToCart,
  (guitar: Guitar) => ({
    payload: {
      guitar,
    },
  }),
);

export const updateGuitarsInCart = createAction(
  ActionType.UpdateGuitarsInCart,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);

export const applyCoupon = createAction(
  ActionType.ApplyCoupon,
  (coupon: number) => ({
    payload: {
      coupon,
    },
  }),
);

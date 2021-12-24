import { Order, SortBy } from '../../const';
import { setOrder, setSort } from '../action';

import { SearchParameters } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: SearchParameters = {
  sort: SortBy.Unknown,
  order: Order.Unknown,
};

const searchParameters = createReducer(initialState, (builder) => {
  builder
    .addCase(setSort, (state, action) => {
      const {sort} = action.payload;

      state.sort = sort;
    })
    .addCase(setOrder, (state, action) => {
      const {order} = action.payload;

      state.order = order;
    });
});

export {searchParameters};

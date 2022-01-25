import { addGuitarToCart, removeGuitarFromCart } from '../action';

import { UserActions } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: UserActions = {
  guitarsInCart: [],
};

const userActions = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      const {guitar} = action.payload;

      state.guitarsInCart.push(guitar);
    })
    .addCase(removeGuitarFromCart, (state, action) => {
      const {guitar} = action.payload;

      const deletedGuitarIndex = state.guitarsInCart.indexOf(guitar);
      state.guitarsInCart.splice(deletedGuitarIndex, 1);
    });
});

export {userActions};

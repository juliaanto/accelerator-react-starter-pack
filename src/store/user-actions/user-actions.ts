import { addGuitarToCart, updateGuitarsInCart } from '../action';

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
    .addCase(updateGuitarsInCart, (state, action) => {
      const {guitars} = action.payload;

      state.guitarsInCart = guitars;
    });
});

export {userActions};

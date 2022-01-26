import { addGuitarToCart, applyCoupon, updateGuitarsInCart } from '../action';

import { UserActions } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: UserActions = {
  guitarsInCart: [],
  coupon: 0,
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
    })
    .addCase(applyCoupon, (state, action) => {
      const {coupon} = action.payload;

      state.coupon = coupon;
    });
});

export {userActions};

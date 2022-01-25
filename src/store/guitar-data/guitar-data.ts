import { addGuitarToCart, loadComments, loadCurrentGuitar, loadGuitars, loadGuitarsCount, loadInitialGuitars } from '../action';

import { GuitarData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: GuitarData = {
  guitars: [],
  guitarsCount: 0,
  initialGuitars: [],
  isDataLoaded: false,
  comments: [],
  guitarsInCart: [],
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      const {guitars} = action.payload;

      state.guitars = guitars;
      state.isDataLoaded = true;
    })
    .addCase(loadComments, (state, action) => {
      const {comments} = action.payload;

      state.comments = state.comments.concat(comments);
    })
    .addCase(loadGuitarsCount, (state, action) => {
      const {guitars} = action.payload;
      const guitarsCount = guitars.length;

      state.guitarsCount = guitarsCount;
    })
    .addCase(loadInitialGuitars, (state, action) => {
      const {initialGuitars} = action.payload;

      state.initialGuitars = initialGuitars;
    })
    .addCase(loadCurrentGuitar, (state, action) => {
      const {guitar} = action.payload;

      state.currentGuitar = guitar;
    })
    .addCase(addGuitarToCart, (state, action) => {
      const {guitar} = action.payload;

      state.guitarsInCart.push(guitar);
    });
});

export {guitarData};

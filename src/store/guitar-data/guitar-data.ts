import { loadGuitars, loadGuitarsCount, loadInitialGuitars } from '../action';

import { GuitarData } from '../../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: GuitarData = {
  guitars: [],
  guitarsCount: 0,
  initialGuitars: [],
  isDataLoaded: false,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      const {guitars} = action.payload;

      state.guitars = guitars;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      const {guitars} = action.payload;
      const guitarsCount = guitars.length;

      state.guitarsCount = guitarsCount;
    })
    .addCase(loadInitialGuitars, (state, action) => {
      const {initialGuitars} = action.payload;

      state.initialGuitars = initialGuitars;
    });
});

export {guitarData};

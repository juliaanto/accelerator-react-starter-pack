import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';

export enum NameSpace {
  data = 'DATA',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarData,
});

export type RootState = ReturnType<typeof rootReducer>;

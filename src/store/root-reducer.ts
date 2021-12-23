import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { searchParameters } from './search-parameters/search-parameters';

export enum NameSpace {
  data = 'DATA',
  paramaters = 'PARAMETERS',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarData,
  [NameSpace.paramaters]: searchParameters,
});

export type RootState = ReturnType<typeof rootReducer>;

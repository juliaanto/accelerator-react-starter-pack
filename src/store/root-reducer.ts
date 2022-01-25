import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { searchParameters } from './search-parameters/search-parameters';
import { userActions } from './user-actions/user-actions';

export enum NameSpace {
  data = 'DATA',
  paramaters = 'PARAMETERS',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarData,
  [NameSpace.paramaters]: searchParameters,
  [NameSpace.user]: userActions,
});

export type RootState = ReturnType<typeof rootReducer>;

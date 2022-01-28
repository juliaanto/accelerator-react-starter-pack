import { combineReducers } from '@reduxjs/toolkit';
import { guitarData } from './guitar-data/guitar-data';
import { searchParameters } from './search-parameters/search-parameters';
import { userActions } from './user-actions/user-actions';

export enum NameSpace {
  Data = 'DATA',
  Parameters = 'PARAMETERS',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: guitarData,
  [NameSpace.Parameters]: searchParameters,
  [NameSpace.User]: userActions,
});

export type RootState = ReturnType<typeof rootReducer>;

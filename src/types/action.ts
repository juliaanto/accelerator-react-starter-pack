import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {Action} from 'redux';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  LoadInitialGuitars = 'data/loadInitialGuitars',
  RedirectToRoute = 'guitars/redirectToRoute',
  SetSort = 'parameters/setSort',
  SetOrder = 'parameters/setOrder',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

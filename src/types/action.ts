import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {Action} from 'redux';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadComments = 'data/loadComments',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  LoadInitialGuitars = 'data/loadInitialGuitars',
  RedirectToRoute = 'guitars/redirectToRoute',
  SetSort = 'parameters/setSort',
  SetOrder = 'parameters/setOrder',
  LoadCurrentGuitar = 'data/loadGuitar',
  AddGuitarToCart = 'user/addGuitarToCart',
  RemoveGuitarFromCart = 'user/removeGuitarFromCart'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarsCount, loadInitialGuitars, redirectToRoute, setOrder, setSort } from '../store/action';

import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  LoadInitialGuitars = 'data/loadInitialGuitars',
  RedirectToRoute = 'guitars/redirectToRoute',
  SetSort = 'parameters/setSort',
  SetOrder = 'parameters/setOrder',
}

export type Actions =
| ReturnType<typeof loadGuitars>
| ReturnType<typeof loadGuitarsCount>
| ReturnType<typeof loadInitialGuitars>
| ReturnType<typeof redirectToRoute>
| ReturnType<typeof setSort>
| ReturnType<typeof setOrder>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

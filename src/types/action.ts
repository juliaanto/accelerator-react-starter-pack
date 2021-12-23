import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitarsCount, loadInitialGuitars, redirectToRoute } from '../store/action';

import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  LoadGuitarsCount = 'data/loadGuitarsCount',
  LoadInitialGuitars = 'data/loadInitialGuitars',
  RedirectToRoute = 'guitars/redirectToRoute',
}

export type Actions =
| ReturnType<typeof loadGuitars>
| ReturnType<typeof loadGuitarsCount>
| ReturnType<typeof loadInitialGuitars>
| ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

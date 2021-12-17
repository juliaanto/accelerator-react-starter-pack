import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { loadGuitars, redirectToRoute } from '../store/action';

import { AxiosInstance } from 'axios';
import { State } from './state';

export enum ActionType {
  LoadGuitars = 'data/loadGuitars',
  RedirectToRoute = 'guitars/redirectToRoute',
}

export type Actions =
| ReturnType<typeof loadGuitars>
| ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

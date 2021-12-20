import { APIRoute, APIRouteWithVariable, AppRoute } from '../const';
import { loadGuitars, redirectToRoute } from './action';

import { Guitars } from '../types/guitar';
import { HttpCode } from '../services/api';
import { ThunkActionResult } from '../types/action';
import axios from 'axios';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchSortedGuitarsAction = (sort: string, order?: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRouteWithVariable.Sort(sort, order));
      dispatch(loadGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

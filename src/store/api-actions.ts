import { APIRoute, APIRouteWithVariable, AppRoute, SERVER_UNAVAILABLE_MESSAGE } from '../const';
import { loadGuitars, loadGuitarsCount, loadInitialGuitars, redirectToRoute } from './action';

import { Guitars } from '../types/guitar';
import { HttpCode } from '../services/api';
import { ThunkActionResult } from '../types/action';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
      dispatch(loadInitialGuitars(data));
    } catch (error: unknown) {
      toast.error(SERVER_UNAVAILABLE_MESSAGE);
    }
  };

export const fetchFilteredGuitarsAction = (filterParams: string, sort: string, order: string, pageNumber: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRouteWithVariable.GuitarsByParameters(filterParams, sort, order, pageNumber));
      dispatch(loadGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchGuitarsCountAction = (filterParams: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRouteWithVariable.GuitarsCount(filterParams));
      dispatch(loadGuitarsCount(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

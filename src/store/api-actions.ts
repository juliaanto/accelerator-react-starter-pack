import { APIRoute, APIRouteWithVariable, AppRoute } from '../const';
import { loadGuitars, loadInitialGuitars, redirectToRoute } from './action';

import { Guitars } from '../types/guitar';
import { HttpCode } from '../services/api';
import { ThunkActionResult } from '../types/action';
import axios from 'axios';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      dispatch(loadGuitars(data));
      dispatch(loadInitialGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchSortedGuitarsAction = (filterParams: string, sort: string, order?: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRouteWithVariable.Sort(filterParams, sort, order));
      dispatch(loadGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchFilteredGuitarsAction = (searchParams: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRouteWithVariable.Filter(searchParams));
      dispatch(loadGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const fetchPagedGuitarsAction = (filterParams: string, pageNumber: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRouteWithVariable.Pagination(filterParams, pageNumber));
      dispatch(loadGuitars(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

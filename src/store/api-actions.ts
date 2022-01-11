import { APIRoute, APIRouteWithVariable, AppRoute } from '../const';
import { loadComments, loadGuitars, loadGuitarsCount, loadInitialGuitars, redirectToRoute } from './action';

import { Comments } from '../types/comment';
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
      data.map((guitar) => api.get<Comments>(APIRouteWithVariable.CommentsByGuitarId(guitar.id)).then((response) => {
        try {
          dispatch(loadComments(response.data));
        } catch (error: unknown) {
          dispatch(redirectToRoute(AppRoute.ServerUnavailable));
        }
      }));
    } catch (error: unknown) {
      dispatch(redirectToRoute(AppRoute.ServerUnavailable));
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

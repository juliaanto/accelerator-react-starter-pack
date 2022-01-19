import { APIRoute, APIRouteWithVariable, AppRoute, Links } from '../const';
import { Guitar, Guitars } from '../types/guitar';
import { loadComments, loadCurrentGuitar, loadGuitars, loadGuitarsCount, loadInitialGuitars, redirectToRoute } from './action';

import { CommentPost } from '../types/comment-post';
import { Comments } from '../types/comment';
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

export const fetchCurrentGuitarAction = (guitarId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar>(APIRouteWithVariable.GuitarById(guitarId));
      dispatch(loadCurrentGuitar(data));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

export const reviewPostAction = ({guitarId, userName, advantage, disadvantage, comment, rating}: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post<CommentPost>(APIRoute.Comments, {guitarId, userName, advantage, disadvantage, comment, rating});
      dispatch(redirectToRoute(Links.ProductById(guitarId)));
      window.location.reload();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HttpCode.NotFound) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      }
    }
  };

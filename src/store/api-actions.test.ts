import {APIRoute, APIRouteWithVariable, FIRST_PAGE} from '../const';
import { fetchFilteredGuitarsAction, fetchGuitarsAction, fetchGuitarsCountAction } from './api-actions';
import { loadGuitars, loadGuitarsCount, loadInitialGuitars } from './action';
import thunk, {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import MockAdapter from 'axios-mock-adapter';
import {State} from '../types/state';
import api from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { makeFakeGuitars } from '../utils/mocks';

describe('Async actions', () => {
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch LoadGuitars and LoadInitialGuitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();
    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
      loadInitialGuitars(mockGuitars),
    ]);
  });


  it('should dispatch LoadGuitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();
    mockAPI
      .onGet(APIRouteWithVariable.GuitarsByParameters('', '', '', FIRST_PAGE))
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchFilteredGuitarsAction('', '', '', FIRST_PAGE));

    expect(store.getActions()).toEqual([
      loadGuitars(mockGuitars),
    ]);
  });

  it('should dispatch LoadGuitarsCount when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars();
    mockAPI
      .onGet(APIRouteWithVariable.GuitarsCount(''))
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsCountAction(''));

    expect(store.getActions()).toEqual([
      loadGuitarsCount(mockGuitars),
    ]);
  });
});

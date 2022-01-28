import {APIRoute, APIRouteWithVariable, AppLink, FIRST_PAGE, Hash} from '../const';
import { applyCoupon, loadComments, loadCurrentGuitar, loadGuitars, loadGuitarsCount, loadInitialGuitars, redirectToRoute } from './action';
import { couponPostAction, fetchCommentsAction, fetchCurrentGuitarAction, fetchFilteredGuitarsAction, fetchGuitarsAction, fetchGuitarsCountAction } from './api-actions';
import { makeFakeGuitar, makeFakeGuitars, makeFakeReviews } from '../utils/mocks';
import thunk, {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import MockAdapter from 'axios-mock-adapter';
import {State} from '../types/state';
import api from '../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';

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

  it('should dispatch LoadComments when GET /comments', async () => {
    const mockComments = makeFakeReviews();
    mockAPI
      .onGet(APIRoute.Comments)
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction());

    expect(store.getActions()).toEqual([
      loadComments(mockComments),
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

  it('should dispatch LoadCurrentGuitar when GET /guitars', async () => {
    const mockGuitar = makeFakeGuitar();
    mockAPI
      .onGet(APIRouteWithVariable.GuitarById(mockGuitar.id))
      .reply(200, mockGuitar);

    const store = mockStore();
    await store.dispatch(fetchCurrentGuitarAction(mockGuitar.id));

    expect(store.getActions()).toEqual([
      loadCurrentGuitar(mockGuitar),
    ]);
  });

  it('should dispatch RedirectToRoute when POST /comments', async () => {
    const mockGuitar = makeFakeGuitar();
    mockAPI
      .onPost(APIRoute.Comments)
      .reply(200);

    const store = mockStore();
    await store.dispatch(redirectToRoute((`${AppLink.ProductById(mockGuitar.id)}${Hash.Success}`)));

    expect(store.getActions()).toEqual([
      redirectToRoute(`${AppLink.ProductById(mockGuitar.id)}${Hash.Success}`),
    ]);
  });

  it('should dispatch applyCoupon when POST /coupons', async () => {
    const fakeCoupon = 25;

    mockAPI
      .onPost(APIRoute.Coupons)
      .reply(200, fakeCoupon);

    const store = mockStore();
    await store.dispatch(couponPostAction({coupon: ''}, jest.fn(), jest.fn()));

    expect(store.getActions()).toEqual([
      applyCoupon(fakeCoupon),
    ]);
  });
});

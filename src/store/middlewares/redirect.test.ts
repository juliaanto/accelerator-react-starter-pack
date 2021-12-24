import {AnyAction} from 'redux';
import {AppRoute} from '../../const';
import {State} from '../../types/state';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /notfound', () => {
    store.dispatch(redirectToRoute(AppRoute.NotFound));
    expect(fakeHistory.location.pathname).toBe(AppRoute.NotFound);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.NotFound),
    ]);
  });

  it('should not to be redirect /product because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Product});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Product);
  });
});

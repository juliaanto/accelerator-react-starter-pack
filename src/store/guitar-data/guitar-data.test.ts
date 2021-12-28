import { loadGuitars, loadGuitarsCount, loadInitialGuitars } from '../action';

import { guitarData } from './guitar-data';
import { makeFakeGuitars } from '../../utils/mocks';

const guitars = makeFakeGuitars();

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: []});
  });

  it('should update guitars by load guitars', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: []};
    expect(guitarData(state, loadGuitars(guitars)))
      .toEqual({guitars: guitars, guitarsCount: 0, initialGuitars: [], isDataLoaded: true, comments: []});
  });

  it('should update guitars count by load guitars', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: []};
    expect(guitarData(state, loadGuitarsCount(guitars)))
      .toEqual({guitars: [], guitarsCount: guitars.length, initialGuitars: [], isDataLoaded: false, comments: []});
  });

  it('should update initial guitars by load guitars', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: []};
    expect(guitarData(state, loadInitialGuitars(guitars)))
      .toEqual({guitars: [], guitarsCount: 0, initialGuitars: guitars, isDataLoaded: false, comments: []});
  });
});


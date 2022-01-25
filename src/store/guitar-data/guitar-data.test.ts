import { loadCurrentGuitar, loadGuitars, loadGuitarsCount, loadInitialGuitars } from '../action';
import { makeFakeGuitar, makeFakeGuitars } from '../../utils/mocks';

import { guitarData } from './guitar-data';

const guitars = makeFakeGuitars();
const guitar = makeFakeGuitar();

describe('Reducer: guitarData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: []});
  });

  it('should update guitars by load guitars', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: [], guitarsInCart: []};
    expect(guitarData(state, loadGuitars(guitars)))
      .toEqual({guitars: guitars, guitarsCount: 0, initialGuitars: [], isDataLoaded: true, comments: [], guitarsInCart: []});
  });

  it('should update guitars count by load guitars', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: [], guitarsInCart: []};
    expect(guitarData(state, loadGuitarsCount(guitars)))
      .toEqual({guitars: [], guitarsCount: guitars.length, initialGuitars: [], isDataLoaded: false, comments: [], guitarsInCart: []});
  });

  it('should update initial guitars by load guitars', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: [], guitarsInCart: []};
    expect(guitarData(state, loadInitialGuitars(guitars)))
      .toEqual({guitars: [], guitarsCount: 0, initialGuitars: guitars, isDataLoaded: false, comments: [], guitarsInCart: []});
  });

  it('should update current guitar by load guitar', () => {
    const state = {guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: [], guitarsInCart: []};
    expect(guitarData(state, loadCurrentGuitar(guitar)))
      .toEqual({guitars: [], guitarsCount: 0, initialGuitars: [], isDataLoaded: false, comments: [], currentGuitar: guitar, guitarsInCart: []});
  });
});


import { Order, SortBy } from '../../const';
import { setOrder, setSort } from '../action';

import { searchParameters } from './search-parameters';

describe('Reducer: searchParameters', () => {
  it('without additional parameters should return initial state', () => {
    expect(searchParameters(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({sort: SortBy.Unknown, order: Order.Unknown});
  });

  it('should update sort by change sort', () => {
    const state = {sort: SortBy.Unknown, order: Order.Unknown};
    expect(searchParameters(state, setSort(SortBy.Rating)))
      .toEqual({sort: SortBy.Rating, order: Order.Unknown});
  });

  it('should update order by change order', () => {
    const state = {sort: SortBy.Unknown, order: Order.Unknown};
    expect(searchParameters(state, setOrder(Order.Desc)))
      .toEqual({sort: SortBy.Unknown, order: Order.Desc});
  });
});

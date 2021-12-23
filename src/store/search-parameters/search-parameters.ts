import { ActionType, Actions } from '../../types/action';
import { Order, SortBy } from '../../const';

import { SearchParameters } from '../../types/state';

const initialState: SearchParameters = {
  sort: SortBy.Unknown,
  order: Order.Unknown,
};

const searchParameters = (state = initialState, action: Actions): SearchParameters => {
  switch (action.type) {
    case ActionType.SetSort: {
      const sort = action.payload;
      return {...state, sort};
    }
    case ActionType.SetOrder: {
      const order = action.payload;
      return {...state, order};
    }
    default:
      return state;
  }
};

export {searchParameters};

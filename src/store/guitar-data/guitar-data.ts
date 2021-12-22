import { ActionType, Actions } from '../../types/action';

import { GuitarData } from '../../types/state';

const initialState: GuitarData = {
  guitars: [],
  initialGuitars: [],
  isDataLoaded: false,
};

const guitarData = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.LoadGuitars: {
      const {guitars} = action.payload;
      return {...state, guitars, isDataLoaded: true};
    }
    case ActionType.LoadInitialGuitars: {
      const {initialGuitars} = action.payload;
      return {...state, initialGuitars, isDataLoaded: true};
    }
    default:
      return state;
  }
};

export {guitarData};

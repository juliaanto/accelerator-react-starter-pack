import { ActionType, Actions } from '../../types/action';

import { GuitarData } from '../../types/state';

const initialState: GuitarData = {
  guitars: [],
  guitarsCount: 0,
  initialGuitars: [],
  isDataLoaded: false,
};

const guitarData = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionType.LoadGuitars: {
      const {guitars} = action.payload;
      return {...state, guitars, isDataLoaded: true};
    }
    case ActionType.LoadGuitarsCount: {
      const {guitars} = action.payload;
      const guitarsCount = guitars.length;
      return {...state, guitarsCount};
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

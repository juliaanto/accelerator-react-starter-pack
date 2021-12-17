import {ActionType} from '../../types/action';
import {Middleware} from 'redux';
import {State} from '../../types/state';
import browserHistory from '../../browser-history';

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

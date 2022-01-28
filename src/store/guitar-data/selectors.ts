import { Guitar, Guitars } from '../../types/guitar';

import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { createSelector } from 'reselect';

export const getGuitars = (state: State): Guitars => state[NameSpace.Data].guitars;
export const getGuitarsCount = (state: State): number => state[NameSpace.Data].guitarsCount;
export const getInitialGuitars = (state: State): Guitars => state[NameSpace.Data].initialGuitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getCommentsCount = createSelector(
  [
    (state: State) => state[NameSpace.Data].comments,
    (_state: State, currentGuitarId: number) => currentGuitarId,
  ],
  (comments, currentGuitarId) => {
    const guitarComments = comments.filter((comment) => comment.guitarId === currentGuitarId);
    return guitarComments.length;
  });
export const getCurrentGuitar = (state: State): Guitar | undefined => state[NameSpace.Data].currentGuitar;

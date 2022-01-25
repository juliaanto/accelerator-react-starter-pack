import { Guitar, Guitars } from '../../types/guitar';

import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { createSelector } from 'reselect';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getGuitarsCount = (state: State): number => state[NameSpace.data].guitarsCount;
export const getInitialGuitars = (state: State): Guitars => state[NameSpace.data].initialGuitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getCommentsCount = createSelector(
  [
    (state: State) => state[NameSpace.data].comments,
    (_state: State, currentGuitarId: number) => currentGuitarId,
  ],
  (comments, currentGuitarId) => {
    const guitarComments = comments.filter((comment) => comment.guitarId === currentGuitarId);
    return guitarComments.length;
  });
export const getCurrentGuitar = (state: State): Guitar | undefined => state[NameSpace.data].currentGuitar;

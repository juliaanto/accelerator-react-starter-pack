import { Guitars } from '../../types/guitar';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getGuitarsCount = (state: State): number => state[NameSpace.data].guitarsCount;
export const getInitialGuitars = (state: State): Guitars => state[NameSpace.data].initialGuitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;

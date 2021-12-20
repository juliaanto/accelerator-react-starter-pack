import { Guitars } from '../../types/guitar';
import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;

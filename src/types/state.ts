import { Order, SortBy } from '../const';

import { Comments } from './comment';
import { Guitar, Guitars } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarData = {
  guitars: Guitars,
  guitarsCount: number,
  isDataLoaded: boolean,
  initialGuitars: Guitars,
  comments: Comments,
  currentGuitar?: Guitar,
}

export type SearchParameters = {
  sort: SortBy,
  order: Order,
}

export type State = RootState;

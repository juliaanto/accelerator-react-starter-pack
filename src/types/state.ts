import { Order, SortBy } from '../const';

import { Comments } from './comment';
import { Guitars } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarData = {
  guitars: Guitars,
  guitarsCount: number,
  isDataLoaded: boolean,
  initialGuitars: Guitars,
  comments: Comments,
}

export type SearchParameters = {
  sort: SortBy,
  order: Order,
}

export type State = RootState;

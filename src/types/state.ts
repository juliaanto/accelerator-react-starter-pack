import { Guitars } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarData = {
  guitars: Guitars,
  guitarsCount: number,
  isDataLoaded: boolean,
  initialGuitars: Guitars,
}

export type State = RootState;

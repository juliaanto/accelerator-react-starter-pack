import { Guitars } from './guitar';
import { RootState } from '../store/root-reducer';

export type GuitarData = {
  guitars: Guitars,
  isDataLoaded: boolean,
}

export type State = RootState;

import { ActionType } from '../types/action';
import { Guitars } from '../types/guitar';

export const loadGuitars = (guitars: Guitars) => ({
  type: ActionType.LoadGuitars,
  payload: {
    guitars,
  },
} as const);

export const redirectToRoute = (url: string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

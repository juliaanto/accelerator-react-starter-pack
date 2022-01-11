import { PAGES_STEP, PRODUCTS_PER_PAGE } from '../const';

export const getFirstPageInList = (initialPage: number) => (Math.ceil(initialPage / PAGES_STEP) - 1) * PAGES_STEP + 1;

export const getMaxPage = (guitarsCount: number) => Math.ceil(guitarsCount / PRODUCTS_PER_PAGE);

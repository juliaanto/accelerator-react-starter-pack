import { PAGES_STEP, PRODUCTS_PER_PAGE, stringCount } from './const';

import { Guitars } from './types/guitar';

export const getGuitarPrices = (guitarsList: Guitars) => [...new Set(guitarsList.map((guitar) => guitar.price))];

export const getMinPrice = (guitarsList: Guitars) => Math.min(...getGuitarPrices(guitarsList));

export const getMaxPrice = (guitarsList: Guitars) => Math.max(...getGuitarPrices(guitarsList));

export const getStringsCountElementIdByValue = (stringsCountValue: number) => (stringCount.find((element) => element.value === stringsCountValue))?.elementId;

export const getStringsCountValuesByGuitarTypes = (currentGuitarTypes: string[]) => {
  const stringsCountValues: number[] = [];

  currentGuitarTypes.forEach((type) => {
    stringCount.forEach((element) => {

      if (element.guitarTypes.includes(type)){
        stringsCountValues.push(element.value);
      }
    });
  });

  return [...new Set(stringsCountValues)];
};

export const getStringsCountValueByElementId = (elementId: string) => (stringCount.find((element) => element.elementId === elementId))?.value;

export const getFirstPageInList = (initialPage: number) => (Math.ceil(initialPage / PAGES_STEP) - 1) * PAGES_STEP + 1;

export const getMaxPage = (guitarsCount: number) => Math.ceil(guitarsCount / PRODUCTS_PER_PAGE);

export const getRestGuitarsCount = (guitarsCount: number, pageNumber: number) => guitarsCount - (getFirstPageInList(pageNumber) + PAGES_STEP - 1) * PRODUCTS_PER_PAGE;

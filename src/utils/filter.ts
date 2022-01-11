import { Guitars } from '../types/guitar';
import { stringsCountList } from '../const';

const getGuitarPrices = (guitarsList: Guitars) => [...new Set(guitarsList.map((guitar) => guitar.price))];

export const getMinPrice = (guitarsList: Guitars) => Math.min(...getGuitarPrices(guitarsList));

export const getMaxPrice = (guitarsList: Guitars) => Math.max(...getGuitarPrices(guitarsList));

export const getStringsCountElementIdByValue = (stringsCountValue: number) => (stringsCountList.find((element) => element.value === stringsCountValue))?.elementId;

export const getStringsCountValuesByGuitarTypes = (currentGuitarTypes: string[]) => {
  const stringsCountValues: number[] = [];

  currentGuitarTypes.forEach((type) => {
    stringsCountList.forEach((element) => {

      if (element.guitarTypes.includes(type)){
        stringsCountValues.push(element.value);
      }
    });
  });

  return [...new Set(stringsCountValues)];
};

export const getStringsCountValueByElementId = (elementId: string) => (stringsCountList.find((element) => element.elementId === elementId))?.value;

export const getAvailableStringCountId = (availableStringCount: number[]) => availableStringCount.map((element) => getStringsCountElementIdByValue(element));

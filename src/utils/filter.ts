import { Guitars } from '../types/guitar';
import { stringCount } from '../const';

const getGuitarPrices = (guitarsList: Guitars) => [...new Set(guitarsList.map((guitar) => guitar.price))];

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

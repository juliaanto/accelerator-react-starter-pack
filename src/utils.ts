import { Guitars } from './types/guitar';

export const getGuitarPrices = (guitarsList: Guitars) => [...new Set(guitarsList.map((guitar) => guitar.price))];

export const getMinPrice = (guitarsList: Guitars) => Math.min(...getGuitarPrices(guitarsList));

export const getMaxPrice = (guitarsList: Guitars) => Math.max(...getGuitarPrices(guitarsList));

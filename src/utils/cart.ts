import { Guitars } from '../types/guitar';

export const getUniqueGuitars = (guitars: Guitars) => {
  const uniqueGuitarIds = [...new Set(guitars.map((guitar) => guitar.id))];
  const uniqueGuitars: Guitars = [];

  uniqueGuitarIds.forEach((uniqueId) => {
    const uniqueGuitar = guitars.find((guitar) => guitar.id === uniqueId);
    if (uniqueGuitar) {
      uniqueGuitars.push(uniqueGuitar);
    }
  });

  return uniqueGuitars;
};

export const getTotalValue = (guitars: Guitars) => {
  let totalValue = 0;

  guitars.forEach((guitar) => {
    totalValue += guitar.price;
  });

  return totalValue;
};

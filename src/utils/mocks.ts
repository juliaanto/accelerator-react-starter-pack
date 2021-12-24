import { Guitar, Guitars } from '../types/guitar';
import {datatype, image, lorem, name, vehicle} from 'faker';

const GUITARS_COUNT = 20;

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number(),
  name: name.firstName(),
  vendorCode: vehicle.vehicle(),
  type: vehicle.type(),
  description: lorem.text(),
  previewImg: image.image(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
} as Guitar);

export const makeFakeGuitars = (): Guitars => {
  const guitars = [];

  for (let i = 0; i < GUITARS_COUNT; i++) {
    guitars.push(makeFakeGuitar());
  }

  return guitars;
};

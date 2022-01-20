import { Guitar, Guitars } from '../types/guitar';
import {datatype, image, lorem, name, vehicle} from 'faker';

import { Comments } from '../types/comment';

const GUITARS_COUNT = 20;
const REVIEWS_COUNT = 3;

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

export const makeFakeReview = () => ({
  id: String(datatype.number()),
  userName: name.firstName(),
  advantage: 'Хорошо. Очень хорошо.',
  disadvantage: 'Плохо. Очень плохо.',
  comment: 'Неплохо, но дорого.',
  rating: Math.floor(Math.random() * 6),
  createAt: String(datatype.datetime()),
  guitarId: datatype.number(),
});

export const makeFakeReviews = (): Comments => {
  const reviews = [];

  for (let i = 0; i < REVIEWS_COUNT; i++) {
    reviews.push(makeFakeReview());
  }

  return reviews;
};

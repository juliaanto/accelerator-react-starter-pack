import 'dayjs/locale/ru';

import dayjs from 'dayjs';
import { guitarTypes } from '../const';

dayjs.locale('ru');

export const getGuitarType = (type: string) => guitarTypes.find((element) => (element.typeKey === type))?.typeName;

export const getDateFormatted = (date: string) => date === undefined ? '' : dayjs(date).format('D MMMM');

export const getPriceFormatted = (price: number) => `${String(price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽`;

import { guitarTypes } from '../const';

export const getGuitarType = (type: string) => guitarTypes.find((element) => (element.typeKey === type))?.typeName;

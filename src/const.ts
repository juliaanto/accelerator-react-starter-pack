export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/page_:pageNumber',
  Product = '/product/:id',
  NotFound = '/notfound',
  ServerUnavailable = '/serverunavailable',
  Cart = '/cart',
}

export const AppLink = {
  ProductById: ((id: number): string => `/product/${id}`),
  PageByPageNumber: ((pageNumber: number, filterParams: string): string => `/catalog/page_${pageNumber}${filterParams ? `${filterParams}` : ''}`),
} as const;

export enum APIRoute {
  Guitars = '/guitars',
  FilterPriceMin = 'price_gte=',
  FilterPriceMax = 'price_lte=',
  FilterType = 'type=',
  FilterStringCount = 'stringCount=',
  Comments = '/comments',
  Coupons = '/coupons',
}

export const PRODUCTS_PER_PAGE = 9;

export const PAGES_STEP = 3;

export const FIRST_PAGE = 1;

export const APIRouteWithVariable = {
  CommentsByGuitarId: ((guitarId: number): string => `/guitars/${guitarId}/comments?_sort=createAt&_order=desc`),
  GuitarsBySearchText: ((text: string): string => `/guitars?name_like=${text}`),
  GuitarById: ((guitarId: number): string => `/guitars/${guitarId}`),
  GuitarsByParameters: ((filterParams: string, sort: string, order: string, page: number): string => `/guitars${filterParams ? `${filterParams}` : '?'}${sort}${order}_start=${(page - 1) * PRODUCTS_PER_PAGE}&_limit=${PRODUCTS_PER_PAGE}`),
  GuitarsCount:  ((filterParams: string): string => `/guitars${filterParams ? `${filterParams}` : '?'}`),
} as const;

export enum SortBy {
  Price = '_sort=price&',
  Rating = '_sort=rating&',
  Unknown = '',
}

export enum Order {
  Asc = '_order=asc&',
  Desc = '_order=desc&',
  Unknown = '',
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
  Unknown = '',
}

export const guitarTypes = [
  {
    typeKey: GuitarType.Acoustic,
    typeName: 'Акустическая гитара',
  },
  {
    typeKey: GuitarType.Electric,
    typeName: 'Электрогитара',
  },
  {
    typeKey: GuitarType.Ukulele,
    typeName: 'Укулеле',
  },
  {
    typeKey: GuitarType.Unknown,
    typeName: '',
  },
];

export const initialStringCountValues = [4, 6, 7, 12];

export const stringsCountList = [
  {
    elementId: '4-strings',
    value: 4,
    guitarTypes: [String(GuitarType.Electric), String(GuitarType.Ukulele)],
  },
  {
    elementId: '6-strings',
    value: 6,
    guitarTypes: [String(GuitarType.Acoustic), String(GuitarType.Electric)],
  },
  {
    elementId: '7-strings',
    value: 7,
    guitarTypes: [String(GuitarType.Acoustic), String(GuitarType.Electric)],
  },
  {
    elementId: '12-strings',
    value: 12,
    guitarTypes: [String(GuitarType.Acoustic)],
  },
];

export enum Key {
  Enter = 'Enter',
  Escape = 'Escape',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

export enum Hash {
  Characteristics = '#characteristics',
  Description = '#description',
  Success = '#success',
}

export const REVIEWS_COUNT = 3;

export const REVIEWS_STEP = 3;

export const FIRST_RATE_VALUE = 1;

export const LAST_RATE_VALUE = 5;

export enum Title {
  Main = 'Guitar-shop',
  Cart = 'Корзина — Guitar-shop'
}

export const MAX_GUITARS_QUANTITY = 99;

export const LAST_GUITAR_QUANTITY = 1;

export enum Coupon {
  Light = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555',
}

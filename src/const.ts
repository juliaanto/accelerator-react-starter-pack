export enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  FilterPrefix = '/guitars?',
  NotFound = '/notfound',
}

export const Links = {
  ProductById: ((id: number): string => `/product/${id}`),
};

export enum APIRoute {
  Guitars = '/guitars',
  FilterPriceMin = 'price_gte=',
}

export const APIRouteWithVariable = {
  CommentsByGuitarId: ((guitarId: number): string => `/guitars/${guitarId}/comments`),
  GuitarsBySearchText: ((text: string): string => `/guitars?name_like=${text}`),
  GuitarById: ((guitarId: number): string => `/guitars/${guitarId}`),
  Sort: ((filterParams: string, sort: string, order?: string): string => `/guitars${filterParams ? `${filterParams}&` : '?'}${sort}${order ? order : ''}`),
  Filter: ((searchParams: string): string => `/guitars?${searchParams}`),
};

export enum SortBy {
  Price = '_sort=price',
  Rating = '_sort=rating',
}

export enum Order {
  Asc = '&_order=asc',
  Desc = '&_order=desc',
}

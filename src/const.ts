export enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  NotFound = '/notfound',
}

export const Links = {
  ProductById: ((id: number): string => `/product/${id}`),
};

export enum APIRoute {
  Guitars = '/guitars',
}

export const APIRouteWithVariable = {
  CommentsByGuitarId: ((guitarId: number): string => `/guitars/${guitarId}/comments`),
  GuitarsBySearchText: ((text: string): string => `/guitars?name_like=${text}`),
  GuitarById: ((guitarId: number): string => `/guitars/${guitarId}`),
  Sort: ((sort: string, order?: string): string => `/guitars?${sort}${order}`),
};

export enum SortBy {
  Price = '_sort=price',
  Rating = '_sort=rating',
}

export enum Order {
  Asc = '&_order=asc',
  Desc = '&_order=desc',
}

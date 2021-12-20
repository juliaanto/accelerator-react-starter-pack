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
};

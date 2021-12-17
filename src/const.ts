export enum AppRoute {
  Main = '/',
  NotFound = '/notfound',
}

export enum APIRoute {
  Guitars = '/guitars',
}

export const APIRouteById = {
  CommentsByGuitarId: ((guitarId: number): string => `/guitars/${guitarId}/comments`),
};

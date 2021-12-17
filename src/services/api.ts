import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const REQUEST_TIMEOUT = 5000;

export enum HttpCode {
  NotFound = 404,
}

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

const api = createAPI();

export default api;

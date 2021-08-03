import axios, { AxiosResponse } from 'axios';

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export default axios.create({
  baseURL: '/api/',
  validateStatus: (status) => status < 400,
});

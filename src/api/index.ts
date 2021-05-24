import axios, { Method, AxiosResponse } from 'axios';
import { endpoint } from '../utils/apiConstants';

const api = axios.create({
  baseURL: endpoint,
});

const request = <T>(method: Method, url: string): Promise<AxiosResponse<T>> => {
  return api.request<T>({ method, url });
};

export default request;

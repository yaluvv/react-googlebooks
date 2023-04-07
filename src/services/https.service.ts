import axios from 'axios';
import configFile from '../config.json';
import { transformData } from '../utils/transformData';

const http = axios.create({
  baseURL: configFile.BASE_URL,
});

const httpService = {
  get: http.get,
};

http.interceptors.response.use(
  function (response) {
    response.data = transformData(response.data);

    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default httpService;

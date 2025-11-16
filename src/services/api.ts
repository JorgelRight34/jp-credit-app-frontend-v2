import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import errorHandler from "./errorHandler";
import { ACCESS_TOKEN, IS_DEV_MODE } from "../utils/constants";
import qs from "qs";

const URLS = {
  PROD: "https://jp-credit-app.onrender.com/api",
  DEV: "http://localhost:5270/api",
};

export const baseURL = IS_DEV_MODE ? URLS.DEV : URLS.PROD;
const api = axios.create({ baseURL, paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }) });

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded) {
        const tokenExpiration = decoded.exp!;
        const now = Date.now() / 1000;

        if (tokenExpiration > now) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) errorHandler(error);
    return Promise.reject(error);
  }
);

export default api;

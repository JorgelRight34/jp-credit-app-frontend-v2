import axios from "axios";
import { isJwtValid } from "../utils/auth-utils";
import type { InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "../constants";


export const baseURL = process.env.VITE_BACKEND_URL;

const api = axios.create({ baseURL, paramsSerializer: { indexes: null } });

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      if (isJwtValid(accessToken)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

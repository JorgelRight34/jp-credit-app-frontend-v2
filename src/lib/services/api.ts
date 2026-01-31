import axios from "axios";
import { ACCESS_TOKEN, IS_DEV_MODE } from "../utils/constants";
import { isJwtValid } from "../utils/auth-utils";
import type { InternalAxiosRequestConfig } from "axios";

const URLS = {
  PROD: "https://jp-credit-app.onrender.com/api/",
  DEV: "http://localhost:5270/api/",
};

export const baseURL = IS_DEV_MODE ? URLS.DEV : URLS.PROD;
const api = axios.create({ baseURL });

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
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

import { HttpClient } from "./httpClient";
import { baseURL } from ".";

export const serverClient = new HttpClient(baseURL);

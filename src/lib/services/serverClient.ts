import { HttpClient } from "./httpClient";

export const serverClient = new HttpClient(process.env.VITE_BACKEND_URL!);

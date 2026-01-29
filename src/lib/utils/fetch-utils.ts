import { FormInterceptor } from "@/components";
import { Query } from "@/models/query";
import api from "@/lib/services/api";
import { AxiosRequestConfig } from "axios";
import { cache } from "react";

export const fetchWithQueryParams = async <T>(
    endpoint: string, query?: T, interceptors: FormInterceptor<T>[] = [], config?: AxiosRequestConfig
) => {
    if (query) {
        for (const interceptor of interceptors) {
            query = interceptor(query);
        }
    }
    const response = await api.get(`${endpoint}`, { ...config, params: query });
    return response.data;
}

export const fetchEntity = cache(async (endpoint: string, tags: string[] = [], cache = 60) => {
    const response = await fetch(endpoint, { next: { revalidate: cache, tags: tags } })
    return response.json()
})

export const fetchBlobWithQueryParams = async <T extends Query>(endpoint: string, query?: T, interceptors: FormInterceptor<T>[] = [])
    : Promise<Blob> => {
    return await fetchWithQueryParams(endpoint, query, interceptors, { responseType: "blob" });
}

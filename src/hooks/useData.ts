import { CacheKey } from "@/models"
import { QueryKey, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";

export interface UseApiQueryOptions<T> extends Omit<UseQueryOptions<T, unknown, T, QueryKey>, 'queryKey' | 'queryFn'> {
    enabled?: boolean;
    keepPreviousData?: boolean;
}

export interface UseDataProps<T> extends UseApiQueryOptions<T> {
    key: CacheKey;
    log?: boolean,
    getData?: () => Promise<T> | T;
}

export const useData = <T,>({ key, getData, log = false, ...options }: UseDataProps<T>) => {
    if (log) console.log(key)
    return useQuery({
        queryKey: key,
        queryFn: (getData ?? (() => { return undefined as T })),
        ...options,
    });
}

export const useSuspenseData = <T,>({ key, getData, log = false, ...options }: UseDataProps<T>) => {
    if (log) console.log(key)
    return useSuspenseQuery({
        queryKey: key,
        queryFn: (getData ?? (() => { return undefined as T })),
        ...options,
    });
}
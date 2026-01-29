import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import type { CacheKey } from "@/models"

export interface UseApiQueryOptions<T> extends Omit<UseQueryOptions<T, unknown, T, QueryKey>, 'queryKey' | 'queryFn'> {
    enabled?: boolean;
    keepPreviousData?: boolean;
}

export interface UseDataProps<T> extends UseApiQueryOptions<T> {
    key: CacheKey;
    log?: boolean,
    loader?: () => Promise<T> | T;
}

export const useData = <T,>({ key, loader, log = false, ...options }: UseDataProps<T>) => {
    if (log) console.log(key)
    return useQuery({
        queryKey: key,
        queryFn: (loader ?? (() => { return undefined as T })),
        ...options,
    });
}

export const useSuspenseData = <T,>({ key, loader, log = false, ...options }: UseDataProps<T>) => {
    if (log) console.log(key)
    return useSuspenseQuery({
        queryKey: key,
        queryFn: (loader ?? (() => { return undefined as T })),
        ...options,
    });
}
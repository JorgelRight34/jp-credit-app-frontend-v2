import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import type { CacheKey } from "@/models"
import { useState } from "react";

export interface UseApiQueryOptions<T> extends Omit<UseQueryOptions<T, unknown, T, QueryKey>, 'queryKey' | 'queryFn'> {
    enabled?: boolean;
    keepPreviousData?: boolean;
}

export interface UseDataProps<T> extends UseApiQueryOptions<T> {
    key: CacheKey;
    log?: boolean,
    loader?: () => Promise<T> | T;
}

export const useData = <T,>({ key, loader, ...options }: UseDataProps<T>) => {
    return useQuery({
        queryKey: key,
        queryFn: loader,
        ...options,
    });
}

export const useSuspenseData = <T,>({ key, loader, ...options }: UseDataProps<T>) => {
    return useSuspenseQuery({
        queryKey: key,
        queryFn: loader,
        ...options,
    });
}

interface UseDataWithPaginationProps<T> extends Omit<UseDataProps<T>, "loader"> {
    initialPage?: number;
    loader: (page: number) => Promise<T> | T;
}

export const useDataWithPagination = <T,>({ key, loader, initialPage = 1, ...options }: UseDataWithPaginationProps<T>) => {
    const [page, setPage] = useState(initialPage);

    const result = useQuery({
        queryKey: key.concat(page),
        queryFn: () => loader(page),
        ...options
    })

    return { result, page, setPage }

}
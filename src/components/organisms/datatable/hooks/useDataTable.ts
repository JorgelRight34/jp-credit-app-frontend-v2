import { useMemo } from "react";
import { useDataTableState } from "./useDataTableState";
import type { CacheKey, PagedResponse } from "@/models";
import type { Query } from "@/components/organisms/search-form/models/query";
import type { Column, PageSize } from "../../table";
import type { UseDataProps } from "@/hooks/useData";
import { useData } from "@/hooks/useData";

export interface UseDataTableProps<T, TQuery extends Query> {
    cacheKey: CacheKey;
    query?: TQuery;
    columns?: Array<Column<T>>;
    pageSize?: PageSize;
    loadInitialSelection?: boolean;
    enabled?: boolean
    initialData?: PagedResponse<T>;
    placeholderData?: UseDataProps<PagedResponse<T>>["placeholderData"]
    loader: (q: TQuery) => Promise<PagedResponse<T>>
}

export const useDataTable = <T, TQuery extends Query>({
    cacheKey,
    query = {} as TQuery,
    pageSize,
    enabled = true,
    initialData,
    columns,
    placeholderData,
    loader,
}: UseDataTableProps<T, TQuery>) => {
    const { page, limit, order, fetchPage, sort, setLimit } = useDataTableState({ cacheKey, pageSize })
    const memoizedColumns = useMemo(() => columns ?? [], [columns]);

    const { data, isLoading, isError } = useData<PagedResponse<T>>({
        key: cacheKey.concat({ limit, page, order, query }),
        loader: () => loader({ ...query, ...order, page, limit }),
        initialData,
        enabled,
        placeholderData
    });

    return {
        data: data,
        isLoading,
        isError,
        page,
        limit,
        columns: memoizedColumns,
        fetchPage,
        sort,
        setLimit
    };
};


import { useMemo } from "react";
import { useDataTableState } from "./useDataTableState";
import type { CacheKey, PagedResponse } from "@/models";
import type { Query } from "@/models/query";
import type { Column, PageSize } from "../../table";
import { useData } from "@/hooks/useData";

export interface UseDataTableProps<T, TQuery> {
    cacheKey: CacheKey;
    query?: TQuery;
    columns?: Array<Column<T>>;
    hiddenColumnIds?: Array<string>;
    pageSize?: PageSize;
    loadInitialSelection?: boolean;
    enabled?: boolean
    initialData?: PagedResponse<T>;
    loader: (q: TQuery) => Promise<PagedResponse<T>>
}

export const useDataTable = <T, TQuery extends Query>({
    columns: initialColumns = [],
    cacheKey,
    hiddenColumnIds,
    query = {} as TQuery,
    pageSize,
    enabled = true,
    initialData,
    loader,
}: UseDataTableProps<T, TQuery>) => {
    const { page, limit, order, fetchPage, sort, setLimit } = useDataTableState({ cacheKey, pageSize })

    const columns = useMemo<Array<Column<T>>>(() => {
        if (!hiddenColumnIds?.length) return initialColumns;

        const hidden = new Set(hiddenColumnIds);

        return initialColumns.filter(col => col.id && !hidden.has(col.id));
    }, [initialColumns, hiddenColumnIds]);

    const getData = async (receivedQuery: TQuery) => {
        return await loader({ ...receivedQuery, ...order, page, limit })
    };

    const { data, isLoading, isError } = useData<PagedResponse<T>>({
        key: [
            ...cacheKey,
            page,
            limit,
            ...Object.values(order ?? {}),
            ...Object.values(query)
        ],
        loader: () => getData(query),
        initialData,
        enabled,
        keepPreviousData: true
    });

    return {
        columns,
        data: data,
        isLoading,
        isError,
        page,
        limit,
        fetchPage,
        sort,
        setLimit
    };
};


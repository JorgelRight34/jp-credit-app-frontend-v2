import { CacheKey } from "@/models";
import { PaginationLimitManager } from "@/services";
import { defaultPageSize } from "@/utils/constants";
import { SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

interface UseDatatableStateProps {
    cacheKey: CacheKey;
    pageSize?: number
}

export const useEntityDataTableState = ({ cacheKey, pageSize }: UseDatatableStateProps) => {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState<{ orderBy: string, orderDesc: boolean } | undefined>();
    const identifier = useMemo(() => JSON.stringify(cacheKey), [cacheKey])
    const [limit, setLimit] = useState(
        PaginationLimitManager.getLimit(identifier) || pageSize || defaultPageSize
    );

    const fetchPage = useCallback((page: number) => {
        setPage(page)
    }, []);

    const handleLimitChange = useCallback(
        (limit: number) => {
            setLimit(limit);
            PaginationLimitManager.setLimit(identifier, limit);
        },
        [identifier]
    );

    const onSortingChange = useCallback((state: SortingState) => {
        const columnToOrder = state[0]
        if (!columnToOrder) return;

        setOrder({ orderBy: columnToOrder.id, orderDesc: columnToOrder.desc })
    }, []);

    return { page, order, limit, fetchPage, sort: onSortingChange, setLimit: handleLimitChange }
}
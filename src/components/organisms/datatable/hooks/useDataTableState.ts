import { startTransition, useCallback, useMemo, useState } from "react";
import { PaginationLimitManager } from "../services/paginationLimitManager";
import type { CacheKey } from "@/models";
import type { SortingState } from "../../table";
import { defaultPageSize } from "@/lib/utils";

interface UseDatatableStateProps {
    cacheKey: CacheKey;
    pageSize?: number
}

export const useDataTableState = ({ cacheKey, pageSize }: UseDatatableStateProps) => {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState<{ orderBy: string, orderDesc: boolean } | undefined>();
    const identifier = useMemo(() => JSON.stringify(cacheKey), [cacheKey])
    const [limit, setLimit] = useState(
        PaginationLimitManager.getLimit(identifier) || pageSize || defaultPageSize
    );

    const fetchPage = useCallback((receivedPage: number) => {
        startTransition(() => setPage(receivedPage))
    }, []);

    const handleLimitChange = useCallback(
        (receivedLimit: number) => {
            setLimit(limit);
            PaginationLimitManager.setLimit(identifier, receivedLimit);
        },
        [identifier]
    );

    const onSortingChange = useCallback((state: SortingState) => {
        const columnToOrder = state[0]

        setOrder({ orderBy: columnToOrder.id, orderDesc: columnToOrder.desc })
    }, []);

    return { page, order, limit, fetchPage, sort: onSortingChange, setLimit: handleLimitChange }
}
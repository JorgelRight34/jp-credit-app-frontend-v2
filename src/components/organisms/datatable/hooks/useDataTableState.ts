import { startTransition, useMemo, useState } from "react";
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
    const [order, setOrder] = useState<{ orderBy: string, orderDesc: boolean } | null>(null);
    const identifier = useMemo(() => JSON.stringify(cacheKey), [cacheKey])
    const [limit, setLimit] = useState(() =>
        PaginationLimitManager.getLimit(identifier) || pageSize || defaultPageSize
    );

    const fetchPage = (receivedPage: number) => {
        startTransition(() => setPage(receivedPage))
    };

    const handleLimitChange = (receivedLimit: number) => {
        setLimit(receivedLimit);
        PaginationLimitManager.setLimit(identifier, receivedLimit);
    }

    const onSortingChange = ([state]: SortingState) => {
        setOrder({ orderBy: state.id, orderDesc: state.desc })
    };

    return { page, order, limit, fetchPage, sort: onSortingChange, setLimit: handleLimitChange }
}
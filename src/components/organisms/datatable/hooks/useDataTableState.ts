import { startTransition, useMemo, useState } from "react";
import { PaginationLimitManager } from "../services/paginationLimitManager";
import type { CacheKey } from "@/models";
import type { SortingState } from "../../table";
import { usePageSize } from "@/components/molecules";

interface UseDatatableStateProps {
    cacheKey: CacheKey;
    pageSize?: number
}

export const useDataTableState = ({ cacheKey, pageSize }: UseDatatableStateProps) => {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState<{ orderBy: string, orderDesc: boolean } | null>(null);
    const identifier = useMemo(() => JSON.stringify(cacheKey), [cacheKey])
    const [limit, setLimit] = usePageSize(identifier, pageSize)

    const fetchPage = (receivedPage: number) => {
        startTransition(() => setPage(receivedPage))
    };

    const handleLimitChange = (receivedLimit: number) => {
        if (limit === receivedLimit) return;

        startTransition(() => {
            setLimit(receivedLimit)
            PaginationLimitManager.setLimit(identifier, receivedLimit);
        });

    }

    const onSortingChange = ([state]: SortingState) => {
        startTransition(() => {
            if (state) {
                setOrder({ orderBy: state.id, orderDesc: state.desc })
            } else {
                setOrder(null)
            }
        })

    };

    return { page, order, limit, fetchPage, sort: onSortingChange, setLimit: handleLimitChange }
}
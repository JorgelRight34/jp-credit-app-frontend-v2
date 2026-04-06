import { PaginationLimitManager } from "@/components/organisms";
import { startTransition, useCallback, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../lib/constants";

export const usePageSize = (identifier: string, defaultPageSize: number = DEFAULT_PAGE_SIZE):
    [number, (size: number) => void] => {
    const [pageSize, setPageSize] = useState(() =>
        PaginationLimitManager.getLimit(identifier) || defaultPageSize
    );

    const handleOnPageSizeChange = useCallback((size: number) => {
        setPageSize(size)
        startTransition(() => PaginationLimitManager.setLimit(identifier, size));
    }, [])

    return [pageSize, handleOnPageSizeChange]
}
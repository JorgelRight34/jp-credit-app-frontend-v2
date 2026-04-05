import { PaginationLimitManager } from "@/components/organisms";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../lib/constants";

export const usePageSize = (identifier: string, defaultPageSize: number = DEFAULT_PAGE_SIZE) => {
    return useState(() =>
        PaginationLimitManager.getLimit(identifier) || defaultPageSize
    );
}
/* eslint-disable react-hooks/incompatible-library */
"use client"
"use no memo"

import {
    ExpandedState,
    getCoreRowModel, getExpandedRowModel, getPaginationRowModel,
    getSortedRowModel, PaginationState, RowSelectionState,
    SortingState, useReactTable
} from "@tanstack/react-table";
import { useState } from "react";
import { Column } from "../models/column";
import { defaultPageSize } from "@/utils/constants";
import { PageSize } from "../models/pageSize";
import { getUpdaterOrValue } from "../lib/utils";

export interface UseDatatableStateProps<TData> {
    data?: TData[];
    pageSize?: PageSize;
    columns: Column<TData>[];
    selectBehavior?: "single" | "multiple"
    allowExpand?: boolean;
    onPageChange?: (page: number) => void;
    onSortingChange?: (sort: SortingState) => void;
}

export const useDataTableState = <T,>({
    pageSize = defaultPageSize,
    data,
    columns,
    selectBehavior = "multiple",
    allowExpand = false,
    onPageChange,
    onSortingChange,
}: UseDatatableStateProps<T>) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        data: data ?? [],
        columns,
        manualPagination: !!onPageChange,
        state: { pagination, sorting, rowSelection, expanded },
        enableRowSelection: true,
        getPaginationRowModel: onPageChange ? undefined : getPaginationRowModel(),
        onExpandedChange: (updater) => {
            const newExpandedState = typeof updater === 'function' ? updater(expanded) : updater;
            if (selectBehavior === "single") {
                const expandedRowId = Object.keys(newExpandedState).find(id =>
                    newExpandedState[id as keyof typeof newExpandedState]
                )
                if (expandedRowId) {
                    setExpanded({ [expandedRowId]: true });
                } else {
                    setExpanded({});
                }
            } else {
                setExpanded(newExpandedState);
            }
        },
        onRowSelectionChange: setRowSelection,
        onPaginationChange: (updaterOrValue) => {
            setPagination((prev) => {
                const next = getUpdaterOrValue(updaterOrValue, prev)
                onPageChange?.(next.pageIndex + 1);

                return next;
            });
        },
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => allowExpand,
        onSortingChange: (updaterOrValue) => {
            setSorting((prev) => {
                const next = getUpdaterOrValue(updaterOrValue, prev)
                onSortingChange?.(next);

                return next;
            });
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return { table, rowSelection, setRowSelection };
};

import {
    getCoreRowModel, getExpandedRowModel, getPaginationRowModel,
    getSortedRowModel, useReactTable
} from "@tanstack/react-table";
import { startTransition, useState } from "react";
import { getUpdaterOrValue } from "../lib/utils";
import type { PageSize } from "../models/pageSize";
import type { Column } from "../models/column";
import type {
    ExpandedState, PaginationState, RowSelectionState,
    SortingState
} from "@tanstack/react-table";
import { defaultPageSize } from "@/lib/utils/constants";

export interface UseTableStateProps<TData> {
    data?: Array<TData>;
    pageSize?: PageSize;
    columns: Array<Column<TData>>;
    selectBehavior?: "single" | "multiple"
    allowExpand?: boolean;
    onPageChange?: (page: number) => void;
    onSortingChange?: (sort: SortingState) => void;
}

const EMPTY: [] = []

export const useTableState = <T,>({
    pageSize = defaultPageSize,
    data,
    columns,
    selectBehavior = "multiple",
    allowExpand = false,
    onPageChange,
    onSortingChange,
}: UseTableStateProps<T>) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        data: data ?? EMPTY,
        columns,
        manualPagination: !!onPageChange,
        state: { pagination, sorting, rowSelection, expanded },
        enableRowSelection: true,
        getPaginationRowModel: onPageChange ? undefined : getPaginationRowModel(),
        onExpandedChange: (updater) => {
            const newExpandedState = typeof updater === 'function' ? updater(expanded) : updater;
            if (selectBehavior === "single") {
                const expandedRowId = Object.keys(newExpandedState).find(
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    id => newExpandedState[id as keyof typeof newExpandedState]
                );
                if (expandedRowId !== undefined) {
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
            startTransition(() => {
                setPagination((prev) => {
                    const next = getUpdaterOrValue(updaterOrValue, prev)
                    startTransition(() => onPageChange?.(next.pageIndex + 1));

                    return next;
                });
            })
        },
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => allowExpand,
        onSortingChange: (updaterOrValue) => {
            setSorting((prev) => {
                const next = getUpdaterOrValue(updaterOrValue, prev)
                startTransition(() => onSortingChange?.(next));

                return next;
            });
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return { table, rowSelection, setRowSelection };
};

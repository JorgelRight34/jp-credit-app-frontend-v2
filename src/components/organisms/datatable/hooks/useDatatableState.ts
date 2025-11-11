import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import {
    getCoreRowModel, getExpandedRowModel, getPaginationRowModel,
    getSortedRowModel, PaginationState, RowSelectionState,
    SortingState, useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Column } from "../models/column";
import { Row } from "../models/row";
import { defaultPageSize } from "@/utils/constants";
import { PageSize } from "../models/pageSize";

export interface UseDatatableStateProps<TData> {
    data?: TData[];
    pageSize?: PageSize;
    columns: Column<TData>[];
    selectBehavior?: "single" | "multiple"
    allowExpand?: boolean;
    navigateCallback?: (page: number) => void;
    onSortingChange?: (sort: SortingState) => void;
    getInitialSelection?: (rows: Row<TData>[]) => Row<TData>[];
}

export const useDatatableState = <T,>({
    pageSize,
    data,
    columns,
    selectBehavior = "multiple",
    allowExpand = false,
    navigateCallback,
    onSortingChange,
    getInitialSelection
}: UseDatatableStateProps<T>) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize ?? defaultPageSize,
    });
    const { pageIndex } = pagination;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [expanded, setExpanded] = useState({});

    const memoizedColumns = useMemo(() => columns, [columns]);

    const table = useReactTable({
        data: data ?? [],
        columns: memoizedColumns,
        manualPagination: !!navigateCallback,
        getPaginationRowModel: navigateCallback ? undefined : getPaginationRowModel(),
        state: { pagination, sorting, rowSelection, expanded },
        enableRowSelection: true,
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
        onPaginationChange: setPagination,
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => allowExpand,
        onSortingChange: (updaterOrValue) => {
            setSorting((prev) => {
                const next = typeof updaterOrValue === "function" ? updaterOrValue(prev) : updaterOrValue;

                onSortingChange?.(next);
                return next;
            });
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    useEffect(() => {
        if (!getInitialSelection) return;

        const initialSelectedRows = getInitialSelection(table.getRowModel().rows);

        if (initialSelectedRows) {
            setRowSelection(prev => ({ ...prev, ...Object.fromEntries(initialSelectedRows.map(row => [row.id, true])) }))
        }
    }, [getInitialSelection, table])

    useUpdateEffect(() => {
        navigateCallback?.(pageIndex + 1);
    }, [pageIndex]);

    return { table, rowSelection, setRowSelection };
};


useDatatableState.displayName = "useDatatableState"
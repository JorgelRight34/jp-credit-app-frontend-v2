/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
    getCoreRowModel, getExpandedRowModel, getPaginationRowModel,
    getSortedRowModel, useReactTable
} from "@tanstack/react-table";
import { startTransition, useState } from "react";
import { getUpdaterOrValue } from "../lib/utils";
import type { PageSize } from "../models/pageSize";
import type { Column } from "../models/column";
import type {
    ExpandedState, PaginationState,
    SortingState,
    TableOptions
} from "@tanstack/react-table";
import { defaultPageSize } from "@/lib/constants/constants";

export type InitialTableState<TData> = TableOptions<TData>["initialState"]

export interface UseTableStateProps<TData> {
    data?: Array<TData>;
    pageSize?: PageSize;
    columns: Array<Column<TData>>;
    selectBehavior?: "single" | "multiple"
    allowExpand?: boolean;
    initialState?: InitialTableState<TData>;
    onPageChange?: (page: number) => void;
    onSortingChange?: (sort: SortingState) => void;
}

const EMPTY: [] = []

export const useTableState = <T,>({
    pageSize,
    data,
    columns,
    selectBehavior,
    allowExpand,
    initialState,
    onPageChange,
    onSortingChange,
}: UseTableStateProps<T>) => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize ?? defaultPageSize,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        data: data ?? EMPTY,
        initialState,
        columns,
        manualPagination: !!onPageChange,
        state: { pagination, sorting, expanded },
        enableRowSelection: true,
        getPaginationRowModel: onPageChange ? undefined : getPaginationRowModel(),
        onExpandedChange: (updater) => {
            const newExpandedState = typeof updater === 'function' ? updater(expanded) : updater;

            if ((selectBehavior ?? "multiple") === "single") {
                const expandedRowId = Object.keys(newExpandedState).find(
                    id => newExpandedState[id as keyof typeof newExpandedState]
                );
                setExpanded(expandedRowId ? { [expandedRowId]: true } : {});
            } else {
                setExpanded(newExpandedState);
            }
        },
        onPaginationChange: (updaterOrValue) => {
            startTransition(() => {
                setPagination((prev) => {
                    const next = getUpdaterOrValue(updaterOrValue, prev)
                    onPageChange?.(next.pageIndex + 1);

                    return next;
                });
            })
        },
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: () => allowExpand ?? false,
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

    return table;
};

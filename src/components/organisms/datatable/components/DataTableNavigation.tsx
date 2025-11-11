import { Table } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import Pagination from "../../ui/Pagination";
import PageSizeSelector from "./PageSizeSelector";
import { DataTableProps } from "./DataTable";
import { defaultPageSize } from "@/utils/constants";
import clsx from "clsx";
import { PageSize } from "../models/pageSize";

interface DataTableNavigationProps<TData> {
  table: Table<TData>;
  totalItems?: number;
  pageSize?: PageSize;
  infinitePagination?: DataTableProps<TData>["infinitePagination"];
  className?: string;
  onLimitChange?: (limit: PageSize) => void;
}

const DataTableNavigation = <TData,>({
  table,
  totalItems = 0,
  className,
  onLimitChange,
  pageSize = defaultPageSize,
}: DataTableNavigationProps<TData>) => {
  const page = table.getState().pagination.pageIndex + 1;
  const currentRows = table.getRowModel().rows.length;

  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  );

  const handlePageSizeChange = useCallback(
    (val: string) => {
      const numericVal = Number(val) as PageSize;
      table.setPageSize(numericVal);
      onLimitChange?.(numericVal);
    },
    [onLimitChange, table],
  );

  const handlePageChange = useCallback(
    (page: number) => table.setPageIndex(page - 1),
    [table],
  );

  return (
    <div className={clsx("w-full border bg-white", className)}>
      {/* Desktop Layout */}
      <div className="flex w-full flex-col justify-center p-3 py-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="mr-auto flex items-center text-sm text-gray-500">
            <span className="hidden md:inline">
              Mostrando {currentRows} / {totalItems} de la página {page} /{" "}
              {totalPages}
            </span>
            <span className="inline md:hidden">
              {currentRows} / {totalItems} | pág {page}
            </span>
          </span>
          <span className="inline md:hidden">
            <PageSizeSelector
              onChange={handlePageSizeChange}
              value={pageSize}
            />
          </span>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-end gap-3 md:flex-row md:justify-center">
          {/* Items per page selector */}
          <div className="hidden flex-shrink-0 md:block">
            <PageSizeSelector
              onChange={handlePageSizeChange}
              value={pageSize < 10 ? 10 : pageSize}
            />
          </div>
          <div className="mt-3 flex flex-shrink-0 items-center md:!mt-0">
            <Pagination
              count={totalPages}
              page={table.getState().pagination.pageIndex + 1}
              onChange={(_, page) => handlePageChange(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableNavigation;

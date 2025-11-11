import "./dataTable.css";
import DataTableNavigation from "./DataTableNavigation";
import { ReactNode, useCallback } from "react";
import { Row } from "../models/row";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import DataTableFooter from "./DataTableFooter";
import DataTableStateWrapper, {
  DataTableStateWrapperProps,
} from "./DataTableStateWrapper";
import DataTableContainer from "./DataTableContainer";

export interface DataTableProps<TData>
  extends Omit<DataTableStateWrapperProps<TData>, "render"> {
  className?: string;
  totalItems?: number;
  infinitePagination?: boolean;
  selectedId?: number | string;
  showContainer?: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
  onExpand?: (row: Row<TData>) => ReactNode;
  onRowClick?: (row: TData) => void;
  onLimitChange?: (limit: number) => void;
}

const DataTable = <TData,>({
  pageSize = 20,
  data,
  totalItems = data?.length,
  className = "data-table",
  infinitePagination = false,
  onRowClick,
  onExpand,
  onLimitChange,
  ...config
}: DataTableProps<TData>) => {
  const handleRowClick = useCallback(
    (row: Row<TData>, event: React.MouseEvent) => {
      event.stopPropagation();
      onRowClick?.(row.original);
    },
    [onRowClick],
  );

  return (
    <DataTableStateWrapper
      pageSize={pageSize}
      allowExpand={!!onExpand}
      data={data}
      {...config}
      render={({ table }) => (
        <DataTableContainer
          className={className}
          head={<DataTableHead table={table} />}
          table={
            <DataTableBody<TData>
              table={table}
              onRowClick={handleRowClick}
              onExpand={onExpand}
            />
          }
          footer={<DataTableFooter table={table} />}
          navigation={
            <DataTableNavigation
              table={table}
              pageSize={pageSize}
              totalItems={totalItems}
              infinitePagination={infinitePagination}
              onLimitChange={onLimitChange}
            />
          }
        />
      )}
    />
  );
};

DataTable.whyDidYouRender = true;

export default DataTable;

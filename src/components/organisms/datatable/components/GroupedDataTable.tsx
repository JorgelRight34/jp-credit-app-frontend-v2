import { ReactNode } from "react";
import { DataTableProps } from "./DataTable";
import DataTableContainer from "./DataTableContainer";
import DataTableHead from "./DataTableHead";
import DataTableNavigation from "./DataTableNavigation";
import DataTableStateWrapper, {
  DataTableRenderProps,
} from "./DataTableStateWrapper";
import { PageSize } from "../models/pageSize";
import DataTableGroupTable from "./DataTableGroupTable";

interface GroupedDataTableProps<T> extends DataTableProps<T> {
  groups: T[][];
  groupPageSize?: PageSize;
  render?: (props: DataTableRenderProps<T>) => ReactNode;
}

const GroupedDataTable = <T,>({
  columns,
  groups,
  groupPageSize,
  pageSize,
  totalItems,
  onPageChange,
  render = DataTableGroupTable,
  onLimitChange,
}: GroupedDataTableProps<T>) => {
  return (
    <DataTableStateWrapper
      columns={columns}
      onPageChange={onPageChange}
      pageSize={pageSize}
      render={({ table }) => (
        <DataTableContainer
          head={<DataTableHead table={table} />}
          table={groups.map((group, index) => (
            <DataTableStateWrapper
              columns={columns}
              data={group}
              pageSize={groupPageSize}
              render={render}
              key={index}
            />
          ))}
          navigation={
            <DataTableNavigation
              table={table}
              totalItems={totalItems}
              pageSize={pageSize}
              onLimitChange={onLimitChange}
            />
          }
        />
      )}
    />
  );
};

export default GroupedDataTable;

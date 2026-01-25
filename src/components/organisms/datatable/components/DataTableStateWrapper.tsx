import { Table } from "@tanstack/react-table";
import {
  useDataTableState,
  UseDatatableStateProps,
} from "../hooks/useDataTableState";
import { ReactNode } from "react";

export type DataTableRenderProps<T> = {
  table: Table<T>;
};

export type DataTableStateWrapperProps<T> = UseDatatableStateProps<T> & {
  render: ({ table }: DataTableRenderProps<T>) => ReactNode;
};

const DataTableStateWrapper = <T,>({
  data,
  pageSize,
  render,
  ...config
}: DataTableStateWrapperProps<T>) => {
  const { table } = useDataTableState({
    data,
    pageSize,
    ...config,
  });

  return render({ table });
};

export default DataTableStateWrapper;

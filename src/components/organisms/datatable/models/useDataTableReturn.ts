import type { ColumnDef } from "@tanstack/react-table";

export interface UseDataTableReturn<T> {
  columns: Array<ColumnDef<T>>;
  onRowClick?: ((data: T) => void) | ((data: T) => Promise<void>);
}

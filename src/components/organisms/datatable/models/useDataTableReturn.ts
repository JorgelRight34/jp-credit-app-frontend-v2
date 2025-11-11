import { ColumnDef } from "@tanstack/react-table";

export interface UseDataTableReturn<T> {
  columns: ColumnDef<T>[];
  onRowClick?: ((data: T) => void) | ((data: T) => Promise<void>);
}

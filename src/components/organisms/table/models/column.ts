import type { ColumnDef } from "@tanstack/react-table";

export type Column<T> = ColumnDef<T>

export type Columns<T> = Array<Column<T>>;
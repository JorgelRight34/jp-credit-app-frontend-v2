import { Query } from "@/models/query";
import { DataTableProps } from "../components/DataTable";
import { Column } from "./column";

/**
 * Props for rendering a generic entity-based data table.
 *
 * @template T - The type of each row entity in the data table.
 */
export type EntityDataTableProps<T, TQuery extends Query> = Partial<DataTableProps<T>> & {
  /**
   * The query object used for filtering/pagination.
   */
  query?: TQuery;

  totalItems?: number | "infinite";
  selectedId?: number | string;


  // ───────────────────────────────
  // 🔹 UI Options
  // ───────────────────────────────

  defaultQuery: TQuery;

  // ───────────────────────────────
  // 🔹 Interaction & Navigation
  // ───────────────────────────────

  navigateCallback?: (page: number) => void;

  extraColumns?: Column<T>[];
  startInsertingExtraColumnsAt?: number;
}

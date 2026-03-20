import type { Query } from "../../search-form";
import type { Column, Row } from "../../table";
import type { ReactNode } from "react";
import type { PagedResponse } from "@/models";

export type DataTableConfig<T, TQuery extends Query = Query> = {
    columns: Array<Column<T>>;
    allowExpand?: boolean;
    getRowId?: (t: T) => string;
    loader: (q: TQuery) => Promise<PagedResponse<T>>;
    onExpand?: (row: Row<T>) => ReactNode;
};
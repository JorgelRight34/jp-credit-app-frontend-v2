import { QuerySearchInput } from "@/components/EntityQuerySearch/models/querySearchInput";
import { EntityDataTableProps } from "@/components/DataTable/models/entityDataTableProps";
import { Query } from "@/models/query";
import { Params } from "react-router";

export type EntitySectionProps<TEntity, TQuery extends Omit<Query, "id">> = TQuery & {
    reportTitle?: string;
    navigate?: boolean;
    table?: Partial<EntityDataTableProps<TEntity, TQuery>>;
    search?: { extraOptions?: QuerySearchInput<TQuery>[] };
    params?: Params;
    onQueryChange?: (data: TQuery) => void;
}

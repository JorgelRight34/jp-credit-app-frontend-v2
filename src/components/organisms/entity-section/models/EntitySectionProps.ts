import { Query } from "@/models/query";
import { EntityDataTableProps } from "../../datatable";
import { QuerySearchInput } from "../../entity-query-search";
import { Params } from "@/models/params";

export type EntitySectionProps<TEntity, TQuery extends Omit<Query, "id">> = TQuery & {
    reportTitle?: string;
    navigate?: boolean;
    table?: Partial<EntityDataTableProps<TEntity, TQuery>>;
    search?: { extraOptions?: QuerySearchInput<TQuery>[] };
    params?: Params;
    onQueryChange?: (data: TQuery) => void;
}

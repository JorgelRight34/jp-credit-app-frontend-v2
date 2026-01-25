import { Query } from "@/models/query";
import { ReactNode } from "react";
import { QuerySearchInput, QuerySearchProps } from "../../entity-query-search";
import { useEntitySection } from "../hooks/useEntitySection";
import {
  EntityDataTableLayout,
  EntityDataTableProps,
} from "../../entity-datatable";
import { Params } from "@/models/params";

export type EntitySectionProps<
  TEntity,
  TQuery extends Omit<Query, "id">,
> = TQuery & {
  reportTitle?: string;
  navigate?: boolean;
  table?: Partial<EntityDataTableProps<TEntity, TQuery>>;
  search?: { extraOptions?: QuerySearchInput<TQuery>[] };
  params?: Params;
};

export type BaseEntitySectionProps<
  TEntity,
  TQuery extends Query,
  TReturn = TQuery,
> = EntitySectionProps<TEntity, TQuery> & {
  Search: (props: QuerySearchProps<TQuery, TReturn>) => ReactNode;
  DataTable: (props: EntityDataTableProps<TEntity, TQuery>) => ReactNode;
};

const EntitySection = <TEntity, TQuery extends Query>({
  search,
  table,
  Search,
  DataTable,
  ...defaultQuery
}: BaseEntitySectionProps<TEntity, TQuery>) => {
  const [controlledQuery, onSearchSubmit, defaultValues] =
    useEntitySection<TQuery>(defaultQuery as TQuery);

  return (
    <EntityDataTableLayout>
      <EntityDataTableLayout.QuerySearch>
        <Search
          defaultValues={defaultValues}
          onSubmit={onSearchSubmit}
          showIfSelectedProject={true}
          {...search}
        />
      </EntityDataTableLayout.QuerySearch>
      <EntityDataTableLayout.DataTable>
        <DataTable
          query={controlledQuery}
          defaultQuery={defaultValues}
          {...table}
        />
      </EntityDataTableLayout.DataTable>
    </EntityDataTableLayout>
  );
};

EntitySection.whyDidYouRender = true;

export default EntitySection;

import { Query } from "@/models/query";
import { ReactNode } from "react";
import { EntitySectionProps } from "../models/entitySectionProps";
import { QuerySearchProps } from "../../entity-query-search";
import { EntityDataTableProps, EntityDataTableLayout } from "../../datatable";
import { useEntitySection } from "../hooks/useEntitySection";

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
  ...query
}: BaseEntitySectionProps<TEntity, TQuery>) => {
  const [controlledQuery, setQuery, defaultValues] = useEntitySection<
    TEntity,
    TQuery
  >(query as TQuery);

  return (
    <EntityDataTableLayout>
      <EntityDataTableLayout.QuerySearch>
        <Search
          defaultValues={defaultValues}
          onSubmit={setQuery}
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

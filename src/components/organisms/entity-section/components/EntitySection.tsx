import { useEntitySection } from "@/components/EntitySection/hooks/useEntitySection";
import { Query } from "@/models/query";
import EntityDataTableLayout from "../../DataTable/layouts/EntityDataTableLayout";
import { EntityDataTableProps, QuerySearchProps } from "@/models";
import { ReactNode } from "react";
import { EntitySectionProps } from "@/components/EntitySection/models/EntitySectionProps";

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

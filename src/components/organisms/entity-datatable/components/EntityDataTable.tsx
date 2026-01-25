import { useCurrentProject } from "@/contexts/ProjectContext";
import { Query } from "@/models/query";
import clsx from "clsx";
import DataTable from "../../datatable/components/DataTable";
import { CacheKey } from "@/models/cacheKey";
import { PagedResponse } from "@/models";
import { toAllTitleCase } from "@/utils/utils";
import { Column } from "../../datatable/models/column";
import { Entity } from "@/models/entity";
import { EntityDataTableProps } from "../models/entityDataTableProps";
import ChooseProjectPrompt from "@/features/projects/components/ChooseProjectPrompt";
import {
  EmptyMessage,
  LoadingSpinner,
  useEntityDataTable,
  UseEntityDataTableProps,
} from "@/components";

type ThisEntityDataTableProps<
  T extends Entity,
  TQuery extends Query,
> = EntityDataTableProps<T, TQuery> &
  Partial<UseEntityDataTableProps<T, TQuery>> & {
    columns: Column<T>[];
    cacheKey: CacheKey;
    title: string;
    validateProject?: boolean;
    displayEmptyMessage?: boolean;
    loader: (options: TQuery) => Promise<PagedResponse<T>>;
  };

const EntityDataTable = <T extends Entity, TQuery extends Query>({
  validateProject = true,
  displayEmptyMessage,
  title,
  query,
  onRowClick,
  onExpand,
  ...props
}: ThisEntityDataTableProps<T, TQuery>) => {
  const { projectId } = useCurrentProject();
  const {
    data: { items, pageSize, totalItems },
    columns,
    isLoading,
    fetchPage,
    setLimit,
    sort,
  } = useEntityDataTable<T, TQuery>({
    query,
    ...props,
  });

  const shouldHideTable = items.length === 0 && !displayEmptyMessage;

  if (projectId === undefined && validateProject)
    return (
      <ChooseProjectPrompt className="mx-auto w-full p-3 md:w-3/5 md:p-5" />
    );

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className={clsx("overflow-x-auto", { hidden: shouldHideTable })}>
        <DataTable
          {...props}
          onRowClick={onRowClick}
          data={items}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={fetchPage}
          onLimitChange={setLimit}
          onSortingChange={sort}
          columns={columns}
          onExpand={onExpand}
        />
      </div>
      {!isLoading && shouldHideTable && (
        <EmptyMessage
          title={toAllTitleCase(title)}
          createPath={"aun no se"}
          className="mx-auto w-75 p-5"
        />
      )}
    </>
  );
};

EntityDataTable.whyDidYouRender = true;

export default EntityDataTable;

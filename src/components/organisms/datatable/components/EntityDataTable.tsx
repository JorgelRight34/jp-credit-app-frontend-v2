import { useCurrentProject } from "@/contexts/ProjectContext";
import { Query } from "@/models/query";
import clsx from "clsx";
import {
  useEntityDatatable,
  UseEntityDatatableProps,
} from "../hooks/useEntityDatatable";
import DataTable from "./DataTable";
import { CacheKey } from "@/models/cacheKey";
import { PagedResponse } from "@/models";
import { toAllTitleCase } from "@/utils/utils";
import { useRouter } from "@/hooks/useRouter";
import { Column } from "../models/column";
import EmptyMessage from "./EmptyMessage";
import { Entity } from "@/models/entity";
import { EntityDataTableProps } from "../models/entityDataTableProps";
import ChooseProjectPrompt from "@/features/projects/components/ChooseProjectPrompt";
import { LoadingSpinner } from "@/components";

type ThisEntityDataTableProps<
  T extends Entity,
  TQuery extends Query,
> = EntityDataTableProps<T, TQuery> &
  Partial<UseEntityDatatableProps<T, TQuery>> & {
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
  retainDataWhileLoading,
  title,
  query,
  onRowClick,
  onExpand,
  ...props
}: ThisEntityDataTableProps<T, TQuery>) => {
  const router = useRouter();
  const { projectId } = useCurrentProject();
  const {
    data: { items, pageSize, totalItems },
    columns,
    isLoading,
    fetchPage,
    setLimit,
    sort,
    getInitialSelection,
  } = useEntityDatatable<T, TQuery>({
    query,
    ...props,
  });

  const shouldHideTable = items.length === 0 && !displayEmptyMessage;

  if (projectId === undefined && validateProject)
    return (
      <ChooseProjectPrompt className="mx-auto w-full p-3 md:w-3/5 md:p-5" />
    );

  if (isLoading && items.length === 0 && retainDataWhileLoading)
    return <LoadingSpinner />;

  return (
    <>
      <div className={clsx("overflow-x-auto", { hidden: shouldHideTable })}>
        <DataTable
          {...props}
          onRowClick={onRowClick}
          data={items}
          pageSize={pageSize}
          totalItems={totalItems}
          navigateCallback={fetchPage}
          onLimitChange={setLimit}
          onSortingChange={sort}
          columns={columns}
          getInitialSelection={getInitialSelection}
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

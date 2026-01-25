import { useMemo } from "react";
import { Query } from "@/models/query";
import { PagedResponse } from "@/models/pagedResponse";
import { useCurrentProject } from "@/contexts/ProjectContext";
import { CacheKey } from "@/models/cacheKey";
import { useSuspenseData } from "@/hooks/useData";
import { Column } from "../../datatable/models/column";
import { useEntityDataTableState } from "./useEntityDataTableState";
import { DataTableProps } from "../../datatable/components/DataTable";
import { Entity } from "@/models/entity";

export interface UseEntityDataTableProps<T extends Entity, TQuery> extends Partial<DataTableProps<T>> {
  cacheKey: CacheKey;
  query?: TQuery;
  validateProject?: boolean;
  columns?: Column<T>[];
  defaultQuery?: TQuery;
  loadInitialSelection?: boolean;
  enabled?: boolean
  loader: (q: TQuery) => Promise<PagedResponse<T>>
}

export const useEntityDataTable = <T extends Entity, TQuery extends Query>({
  columns: initialColumns = [],
  cacheKey,
  query = {} as TQuery,
  pageSize,
  defaultQuery,
  validateProject = true,
  enabled = true,
  loader,
}: UseEntityDataTableProps<T, TQuery>) => {
  const { projectId } = useCurrentProject();
  const { page, limit, order, fetchPage, sort, setLimit } = useEntityDataTableState({ cacheKey, pageSize })

  const columns = useMemo<Column<T>[]>(() => {
    if (!defaultQuery) return initialColumns;

    return initialColumns.filter(
      (col) => !defaultQuery[col.id as keyof typeof defaultQuery]
    );
  }, [defaultQuery, initialColumns]);

  const getData = async (query: TQuery) => {
    return await loader({ ...query, ...order, page, limit, projectId })
  };

  const { data, isLoading, isError } = useSuspenseData<PagedResponse<T>>({
    key: [
      ...cacheKey,
      projectId,
      page,
      limit,
      ...Object.values(order ?? {}),
      ...Object.values(query)
    ],
    getData: () => getData(query),
    enabled: (!validateProject || !!projectId) && enabled,
  });

  return {
    columns,
    data: data,
    isLoading,
    isError,
    page,
    limit,
    fetchPage,
    sort,
    setLimit
  };
};


import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { Query } from "@/models/query";
import { createDefaultPagedResponse } from "@/utils/constants";
import { PagedResponse } from "@/models/pagedResponse";
import { useCurrentProject } from "@/contexts/ProjectContext";
import { CacheKey } from "@/models/cacheKey";
import { useData } from "@/hooks/useData";
import { Column } from "../models/column";
import { useEntityDatatableState } from "./useEntityDatatableState";
import { Row } from "../models/row";
import { Entity } from "@/components/EntityForm/models/entity";
import { DataTableProps } from "../components/DataTable";

export interface UseEntityDatatableProps<T extends Entity, TQuery> extends Partial<DataTableProps<T>> {
  cacheKey: CacheKey;
  query?: TQuery;
  validateProject?: boolean;
  columns?: Column<T>[];
  defaultQuery?: TQuery;
  retainDataWhileLoading?: boolean;
  loadInitialSelection?: boolean;
  enabled?: boolean
  loader: (q: TQuery) => Promise<PagedResponse<T>>
}

const useEntityDatatable = <T extends Entity, TQuery extends Query>({
  columns: initialColumns = [],
  cacheKey,
  query = {} as TQuery,
  pageSize,
  defaultQuery,
  retainDataWhileLoading = true,
  loadInitialSelection = true,
  validateProject = true,
  enabled = true,
  loader,
}: UseEntityDatatableProps<T, TQuery>) => {
  const { projectId } = useCurrentProject();
  const { page, limit, order, fetchPage, sort, setLimit } = useEntityDatatableState({ cacheKey, pageSize })

  const columns = useMemo<Column<T>[]>(() => {
    if (!defaultQuery) return initialColumns;

    return initialColumns.filter(
      (col) => !col.id || !defaultQuery[col.id as keyof typeof defaultQuery]
    );
  }, [defaultQuery, initialColumns]);

  const getData = async (query: TQuery) => {
    return await loader({ ...query, ...order, page, limit, projectId })
  };

  const { data, isLoading, isError } = useData<PagedResponse<T>>({
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
    placeholderData: retainDataWhileLoading ? keepPreviousData : undefined,
  });


  const getInitialSelection = useCallback(
    (rows: Row<T>[]) => {
      if (!loadInitialSelection) return [];
      return rows.filter((row) => row.original.id === query?.id);
    },
    [loadInitialSelection, query?.id]
  );

  return {
    columns,
    data: data || createDefaultPagedResponse<T>(),
    getInitialSelection,
    isLoading,
    isError,
    page,
    limit,
    fetchPage,
    sort,
    setLimit
  };
};

useEntityDatatable.displayName = "useEntityDataTable"

export default useEntityDatatable;

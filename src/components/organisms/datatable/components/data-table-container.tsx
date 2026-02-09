import { SearchContainer } from '../../search-form'
import DataTable from './data-table'
import type { InitialTableState } from '../../table/hooks/useTableState'
import type { DataTableConfig } from '../models/dataTableConfig'
import type { Query, SearchFormConfig } from '../../search-form'
import type { PagedResponse } from '@/models'

export type DataTableContainerProps<TEntity extends object, T extends Query> = {
  searchConfig: SearchFormConfig<T>
  datatableConfig: DataTableConfig<TEntity>
  initialData?: PagedResponse<TEntity>
  initialQuery?: Partial<T>
  initialState?: InitialTableState<TEntity>
}

export type DataTableContainerOverrides<
  T extends object,
  TQuery extends Query,
> = Partial<DataTableContainerProps<T, TQuery>>

const DataTableContainer = <TEntity extends object, TQuery extends Query>({
  datatableConfig,
  initialData,
  searchConfig,
  initialState,
  initialQuery,
}: DataTableContainerProps<TEntity, TQuery>) => {
  return (
    <SearchContainer
      search={searchConfig}
      initialValues={initialQuery}
      render={(query) => (
        <DataTable<TEntity, TQuery>
          title={datatableConfig.title}
          columns={datatableConfig.columns}
          cacheKey={datatableConfig.cacheKey}
          initialData={initialData}
          initialState={initialState}
          query={query}
          loader={datatableConfig.loader}
          onExpand={datatableConfig.onExpand}
        />
      )}
    />
  )
}

export default DataTableContainer

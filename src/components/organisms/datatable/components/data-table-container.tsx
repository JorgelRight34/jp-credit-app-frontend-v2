import DataTable from './data-table'
import type { InitialTableState } from '../../table/hooks/useTableState'
import type { DataTableConfig } from '../models/dataTableConfig'
import {
  SearchFormContainer,
  SearchFormValueConsumer,
  type Query,
  type SearchFormConfig,
} from '../../search-form'
import type { CacheKey, PagedResponse } from '@/models'

export type DataTableContainerProps<TEntity extends object, T extends Query> = {
  searchConfig: SearchFormConfig<T>
  datatableConfig: DataTableConfig<TEntity>
  cacheKey: CacheKey
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
  cacheKey,
}: DataTableContainerProps<TEntity, TQuery>) => {
  return (
    <SearchFormContainer
      searchConfig={searchConfig}
      initialQuery={initialQuery}
    >
      <SearchFormValueConsumer<TQuery>
        render={(query) => (
          <DataTable<TEntity, TQuery>
            columns={datatableConfig.columns}
            cacheKey={cacheKey}
            initialData={initialData}
            initialState={initialState}
            query={query}
            loader={datatableConfig.loader}
            allowExpand={datatableConfig.allowExpand}
            onExpand={datatableConfig.onExpand}
          />
        )}
      />
    </SearchFormContainer>
  )
}

export default DataTableContainer

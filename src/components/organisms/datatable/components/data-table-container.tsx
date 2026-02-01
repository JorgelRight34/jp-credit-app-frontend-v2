import { Suspense } from 'react'
import { SearchContainer } from '../../search-form'
import DataTable from './data-table'
import type { DataTableConfig } from '../models/dataTableConfig'
import type { Query, SearchFormConfig } from '../../search-form'
import type { PagedResponse } from '@/models'

export type DataTableContainerProps<TEntity extends object, T extends Query> = {
  searchConfig: SearchFormConfig<T>
  datatableConfig: DataTableConfig<TEntity>
  initialData?: PagedResponse<TEntity>
}

const DataTableContainer = <TEntity extends object, TQuery extends Query>({
  datatableConfig,
  initialData,
  searchConfig,
}: DataTableContainerProps<TEntity, TQuery>) => {
  return (
    <SearchContainer
      search={searchConfig}
      render={(query) => (
        <Suspense fallback="loading...">
          <DataTable<TEntity, TQuery>
            title={datatableConfig.title}
            columns={datatableConfig.columns}
            cacheKey={datatableConfig.cacheKey}
            initialData={initialData}
            query={query}
            loader={datatableConfig.loader}
            onExpand={datatableConfig.onExpand}
          />
        </Suspense>
      )}
    />
  )
}

export default DataTableContainer

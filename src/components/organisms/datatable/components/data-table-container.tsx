import DataTable from './data-table'
import type { InitialTableState } from '../../table/hooks/useTableState'
import type { DataTableConfig } from '../models/dataTableConfig'
import type { Query, SearchFormConfig } from '../../search-form'
import type { CacheKey, PagedResponse } from '@/models'
import { useSearchContainer } from '../../search-form/hooks/useSearchContainer'
import SearchForm from '../../search-form/components/search-form'

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
  const [controlledQuery, onSearchSubmit] = useSearchContainer(
    initialQuery as TQuery,
  )

  return (
    <section className="flex flex-col w-full">
      <div className="mb-3">
        <SearchForm
          onSubmit={onSearchSubmit}
          options={searchConfig.options}
          defaultValues={searchConfig.defaultValues}
          advanced={searchConfig.advanced}
          schema={searchConfig.schema}
        />
      </div>
      <div>
        <DataTable<TEntity, TQuery>
          columns={datatableConfig.columns}
          cacheKey={cacheKey}
          initialData={initialData}
          initialState={initialState}
          query={controlledQuery}
          loader={datatableConfig.loader}
          allowExpand={datatableConfig.allowExpand}
          onExpand={datatableConfig.onExpand}
        />
      </div>
    </section>
  )
}

export default DataTableContainer

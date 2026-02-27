import { CacheKey } from '@/models'
import { DataTableConfig } from '../models/dataTableConfig'
import DataTable from './data-table'
import { InitialTableState } from '../../table/hooks/useTableState'
import { Query } from '../../search-form'

interface DataTableBuilderProps<T, TQuery extends Query> {
  config: DataTableConfig<T>
  cacheKey: CacheKey
  initialState?: InitialTableState<T>
  query?: TQuery
}

const DataTableBuilder = <T, TQuery extends Query>({
  config,
  initialState,
  cacheKey,
  query,
}: DataTableBuilderProps<T, TQuery>) => {
  return (
    <DataTable
      columns={config.columns}
      cacheKey={cacheKey}
      initialState={initialState}
      query={query}
      loader={config.loader}
      allowExpand={config.allowExpand}
      onExpand={config.onExpand}
    />
  )
}

export default DataTableBuilder

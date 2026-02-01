import { useDataTable } from '../hooks/useDataTable'
import type { UseDataTableProps } from '../hooks/useDataTable'
import type { Column, Row } from '@/components'
import type { CacheKey, PagedResponse } from '@/models'
import type { Query } from '@/components/organisms/search-form/models/query'
import type { ReactNode } from 'react'
import { toTitleCase } from '@/lib/utils'
import { EmptyMessage, LoadingSpinner } from '@/components'
import TableBuilder from '@/components/organisms/table/components/table-builder'

type ThisDataTableProps<T, TQuery extends Query> = Partial<
  UseDataTableProps<T, TQuery>
> & {
  query?: TQuery
  totalItems?: number | 'infinite'
  selectedId?: number | string
  defaultQuery?: TQuery
  extraColumns?: Array<Column<T>>
  startInsertingExtraColumnsAt?: number
  initialData?: PagedResponse<T>
  columns: Array<Column<T>>
  cacheKey: CacheKey
  title: string
  displayEmptyMessage?: boolean
  loader: (options: TQuery) => Promise<PagedResponse<T>>
  onPageChange?: (page: number) => void
  onExpand?: (row: Row<T>) => ReactNode
  onRowClick?: (row: T) => void
}

const DataTable = <T, TQuery extends Query = Query>({
  displayEmptyMessage,
  title,
  query,
  onRowClick,
  onExpand,
  ...props
}: ThisDataTableProps<T, TQuery>) => {
  const { data, columns, isLoading, fetchPage, setLimit, sort } = useDataTable({
    query,
    ...props,
  })

  if (isLoading || data === undefined) return <LoadingSpinner />

  return (
    <>
      <div className="overflow-x-auto">
        {data.items.length > 0 && (
          <TableBuilder
            {...props}
            onRowClick={onRowClick}
            data={data.items}
            columns={columns}
            pageSize={data.pageSize}
            totalItems={data.totalItems}
            onPageChange={fetchPage}
            onLimitChange={setLimit}
            onSortingChange={sort}
            onExpand={onExpand}
          />
        )}
      </div>
      {data.items.length === 0 && displayEmptyMessage && (
        <EmptyMessage title={toTitleCase(title)} className="mx-auto w-75 p-5" />
      )}
    </>
  )
}

export default DataTable

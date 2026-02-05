import { keepPreviousData } from '@tanstack/react-query'
import { useDataTable } from '../hooks/useDataTable'
import type { UseDataTableProps } from '../hooks/useDataTable'
import type { CacheKey, PagedResponse } from '@/models'
import type { ReactNode } from 'react'
import type { Column, Query, Row } from '@/components'
import { TableBuilder } from '@/components'

export type DataTableProps<T, TQuery extends Query> = Partial<
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
  columns,
  placeholderData = keepPreviousData,
  onRowClick,
  onExpand,
  ...props
}: DataTableProps<T, TQuery>) => {
  const { data, limit, isLoading, fetchPage, setLimit, sort } = useDataTable({
    query,
    placeholderData,
    ...props,
  })

  return (
    <div className="overflow-x-auto">
      <TableBuilder
        {...props}
        onRowClick={onRowClick}
        data={data?.items ?? []}
        columns={columns}
        pageSize={limit}
        totalItems={data?.totalItems ?? 0}
        isLoading={isLoading}
        onPageChange={fetchPage}
        onLimitChange={setLimit}
        onSortingChange={sort}
        onExpand={onExpand}
      />
    </div>
  )
}

export default DataTable

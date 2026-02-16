import TableCompositor from './table-compositor'
import TableHeadCompositor from './table-header-compositor'
import TableBodyCompositor from './table-body-compositor'
import TableFooterCompositor from './table-footer-compositor'
import TableNavigation from './table-navigation'
import type { ReactNode } from 'react'
import type { TableStateWrapperProps } from './table-state-wrapper'
import type { Row } from '../models/row'
import { useTableState } from '../hooks/useTableState'

export interface TableBuilderProps<TData> extends Omit<
  TableStateWrapperProps<TData>,
  'render'
> {
  className?: string
  totalItems?: number
  infinitePagination?: boolean
  isLoading?: boolean
  onExpand?: (row: Row<TData>) => ReactNode
  onRowClick?: (row: TData) => void
  onLimitChange?: (limit: number) => void
}

const TableBuilder = <TData,>({
  pageSize,
  data,
  totalItems = data?.length,
  infinitePagination = false,
  className,
  isLoading,
  onRowClick,
  onExpand,
  onLimitChange,
  ...config
}: TableBuilderProps<TData>) => {
  const table = useTableState({ data, pageSize, ...config })

  return (
    <TableCompositor
      className={className}
      navigation={
        <TableNavigation
          table={table}
          pageSize={pageSize}
          totalItems={totalItems}
          infinitePagination={infinitePagination}
          onLimitChange={onLimitChange}
        />
      }
    >
      <TableHeadCompositor table={table} />
      <TableBodyCompositor<TData>
        table={table}
        isLoading={isLoading}
        onRowClick={(r) => onRowClick?.(r.original)}
        onExpand={onExpand}
      />
      <TableFooterCompositor table={table} />
    </TableCompositor>
  )
}

export default TableBuilder

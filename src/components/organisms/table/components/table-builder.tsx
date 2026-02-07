import TableStateWrapper from './table-state-wrapper'
import TableCompositor from './table-compositor'
import TableHeadCompositor from './table-header-compositor'
import TableBodyCompositor from './table-body-compositor'
import TableFooterCompositor from './table-footer-compositor'
import TableNavigation from './table-navigation'
import type { ReactNode } from 'react'
import type { TableStateWrapperProps } from './table-state-wrapper'
import type { Row } from '../models/row'

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
  return (
    <TableStateWrapper
      pageSize={pageSize}
      allowExpand={!!onExpand}
      data={data}
      {...config}
      render={({ table }) => (
        <TableCompositor
          className={className}
          head={<TableHeadCompositor table={table} />}
          body={
            <TableBodyCompositor<TData>
              table={table}
              isLoading={isLoading}
              onRowClick={(r) => onRowClick?.(r.original)}
              onExpand={onExpand}
            />
          }
          footer={<TableFooterCompositor table={table} />}
          navigation={
            <TableNavigation
              table={table}
              pageSize={pageSize}
              totalItems={totalItems}
              infinitePagination={infinitePagination}
              onLimitChange={onLimitChange}
            />
          }
        />
      )}
    />
  )
}

export default TableBuilder

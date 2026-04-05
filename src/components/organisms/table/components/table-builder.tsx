import TableContainer from './table-container'
import TableHeadCompositor from './table-header-compositor'
import TableBodyCompositor from './table-body-compositor'
import TableFooterCompositor from './table-footer-compositor'
import TableNavigation from './table-navigation'
import type { ReactNode } from 'react'
import type { Row } from '../models/row'
import { useTableState, UseTableStateProps } from '../hooks/useTableState'
import Table from './table'

export interface TableBuilderProps<TData> extends UseTableStateProps<TData> {
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
  allowExpand,
  onRowClick,
  onExpand,
  ...config
}: TableBuilderProps<TData>) => {
  const table = useTableState({ data, pageSize, allowExpand, ...config })

  return (
    <TableContainer
      navigation={
        <TableNavigation
          table={table}
          totalItems={totalItems}
          infinitePagination={infinitePagination}
        />
      }
    >
      <Table className={className}>
        <TableHeadCompositor table={table} allowExpand={allowExpand} />
        <TableBodyCompositor<TData>
          table={table}
          allowExpand={allowExpand}
          isLoading={isLoading}
          onRowClick={(r) => onRowClick?.(r.original)}
          onExpand={onExpand}
        />
        <TableFooterCompositor table={table} />
      </Table>
    </TableContainer>
  )
}

export default TableBuilder

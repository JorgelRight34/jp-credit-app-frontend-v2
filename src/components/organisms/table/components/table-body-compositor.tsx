import React from 'react'
import TableBody from './table-body'
import TableRow from './table-row'
import TableRowCompositor from './table-row-compositor'
import TableDataCell from './table-data-cell'
import TableBodySkeleton from './table-body-skeleton'
import type { TableRowCompositorProps } from './table-row-compositor'
import type { Row } from '../models/row'
import type { ReactNode } from 'react'
import type { Table } from '@tanstack/react-table'

interface TableBodyCompositorProps<T> extends Omit<
  TableRowCompositorProps<T>,
  'row'
> {
  table: Table<T>
  isLoading?: boolean
  onExpand?: (row: Row<T>) => ReactNode
}

const TableBodyCompositor = <T,>({
  table,
  isLoading,
  onExpand,
  ...props
}: TableBodyCompositorProps<T>) => {
  if (isLoading)
    return (
      <TableBodySkeleton
        pageSize={table.getState().pagination.pageSize}
        columnsLength={table.getVisibleLeafColumns().length}
      />
    )

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <TableRowCompositor row={row} {...props} />
          {onExpand && row.getIsExpanded() && (
            <TableRow className="border-y !bg-white">
              <TableDataCell
                colSpan={
                  row.getVisibleCells().length + (row.getCanExpand() ? 1 : 0)
                }
                className="p-0 align-top"
              >
                <div className="block w-full">{onExpand(row)}</div>
              </TableDataCell>
            </TableRow>
          )}
        </React.Fragment>
      ))}
    </TableBody>
  )
}

export default TableBodyCompositor

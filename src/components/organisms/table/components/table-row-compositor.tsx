import clsx from 'clsx'
import { flexRender } from '@tanstack/react-table'
import { AddCircleIcon, DoNotDisturbOnIcon, Icon } from '../../../atoms/icon'
import TableRow from './table-row'
import TableDataCell from './table-data-cell'
import type { Row } from '../models/row'

export interface TableRowCompositorProps<TData> {
  row: Row<TData>
  className?: string
  canExpand?: boolean
  expand?: boolean
  onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void
}

const TableRowCompositor = <TData,>({
  row,
  onRowClick,
  className,
}: TableRowCompositorProps<TData>) => {
  return (
    <TableRow
      key={row.id}
      className={clsx('bg-accent-hover cursor-pointer', className, {
        'bg-accent': row.getIsSelected(),
      })}
      onClick={(e) => onRowClick?.(row, e)} // TMP
    >
      {row.getVisibleCells().map((cell) => (
        <TableDataCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableDataCell>
      ))}
      {row.getCanExpand() && (
        <TableDataCell>
          <Icon
            icon={row.getIsExpanded() ? DoNotDisturbOnIcon : AddCircleIcon}
            onClick={(event) => {
              event.stopPropagation()
              row.toggleExpanded()
            }}
          />
        </TableDataCell>
      )}
    </TableRow>
  )
}

export default TableRowCompositor

import { flexRender } from '@tanstack/react-table'
import { AddCircleIcon, DoNotDisturbOnIcon, Icon } from '../../../atoms/icon'
import TableRow from './table-row'
import TableDataCell from './table-data-cell'
import type { Row } from '../models/row'
import { startTransition } from 'react'

export interface TableRowCompositorProps<TData> {
  row: Row<TData>
  className?: string
  allowExpand?: boolean // Using this flag is better on perfomance than row.getCanExpand()
  onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void
}

const TableRowCompositor = <TData,>({
  row,
  allowExpand,
  className,
}: TableRowCompositorProps<TData>) => {
  return (
    <TableRow
      key={row.id}
      className={`bg-accent-hover cursor-pointer ${row.getIsSelected() ? 'bg-accent' : ''} ${className}`}
    >
      {row.getVisibleCells().map((cell) => (
        <TableDataCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableDataCell>
      ))}
      {allowExpand && (
        <TableDataCell>
          <Icon
            className="!text-sm md:!text-base"
            icon={row.getIsExpanded() ? DoNotDisturbOnIcon : AddCircleIcon}
            onClick={(event) => {
              event.stopPropagation()
              startTransition(() => row.toggleExpanded())
            }}
          />
        </TableDataCell>
      )}
    </TableRow>
  )
}

export default TableRowCompositor

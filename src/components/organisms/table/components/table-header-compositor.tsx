import { flexRender } from '@tanstack/react-table'
import TableHead from './table-head'
import TableRow from './table-row'
import TableHeadCell from './table-head-cell'
import type { Table } from '@tanstack/react-table'
import { ArrowDownwardIcon, ArrowUpwardIcon, Icon } from '@/components/atoms'

interface TableHeadProps<T> {
  table: Table<T>
  className?: string
}

const TableHeadCompositor = <T,>({ table, className }: TableHeadProps<T>) => {
  return (
    <TableHead className={className}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="cursor-pointer border-b">
          {headerGroup.headers.map((header) => (
            <TableHeadCell
              className="px-4 py-2 whitespace-normal"
              key={header.id}
            >
              <div
                {...{
                  className: header.column.getCanSort()
                    ? 'cursor-pointer hover flex items-center'
                    : '',
                  onClick: header.column.getToggleSortingHandler(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {header.column.getCanSort() && (
                  <Icon
                    className="ml-2"
                    icon={
                      header.column.getIsSorted() === 'asc'
                        ? ArrowUpwardIcon
                        : header.column.getIsSorted() === 'desc'
                          ? ArrowDownwardIcon
                          : null
                    }
                  />
                )}
              </div>
            </TableHeadCell>
          ))}
          {table.getCanSomeRowsExpand() && <th>&nbsp;</th>}
        </TableRow>
      ))}
    </TableHead>
  )
}

export default TableHeadCompositor

import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'
import TableFooter from './table-footer'
import TableRow from './table-row'
import TableHead from './table-head'
import type { Table } from '@tanstack/react-table'

interface TableFooterCompositorProps<T> {
  table: Table<T>
  className?: string
}

const TableFooterCompositor = <T,>({
  table,
  className,
}: TableFooterCompositorProps<T>) => {
  return (
    table
      .getFooterGroups()
      .some((group) =>
        group.headers.some((header) => header.column.columnDef.footer),
      ) && (
      <TableFooter className={clsx('border-top', className)}>
        {table.getFooterGroups().map((footerGroup) => (
          <TableRow key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableFooter>
    )
  )
}

export default TableFooterCompositor

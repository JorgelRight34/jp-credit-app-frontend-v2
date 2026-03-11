import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr className={clsx('text-secondary bg-surface', className)} {...props}>
      {children}
    </tr>
  )
}

export default TableRow

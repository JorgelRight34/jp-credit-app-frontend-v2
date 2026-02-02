import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr className={clsx('even:bg-stone-50', className)} {...props}>
      {children}
    </tr>
  )
}

export default TableRow

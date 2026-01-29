import clsx from 'clsx'
import type { HTMLAttributes } from 'react'
import '../styles/dataTable.css'

type TableRowProps = HTMLAttributes<HTMLTableRowElement>

const TableRow = ({ children, className, ...props }: TableRowProps) => {
  return (
    <tr className={clsx(className)} {...props}>
      {children}
    </tr>
  )
}

export default TableRow

import clsx from 'clsx'
import type { TdHTMLAttributes } from 'react'
import '../styles/dataTable.css'

type TableDataProps = TdHTMLAttributes<HTMLTableCellElement>

const TableDataCell = ({ children, className, ...props }: TableDataProps) => {
  return (
    <td
      className={clsx('px-4 py-1.5 py-2 text-sm whitespace-normal', className)}
      {...props}
    >
      {children}
    </td>
  )
}

export default TableDataCell

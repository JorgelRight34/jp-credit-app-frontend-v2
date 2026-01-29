import clsx from 'clsx'
import type { ThHTMLAttributes } from 'react'
import '../styles/dataTable.css'

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

const TableHeadCell = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <th className={clsx(className)} {...props}>
      {children}
    </th>
  )
}

export default TableHeadCell

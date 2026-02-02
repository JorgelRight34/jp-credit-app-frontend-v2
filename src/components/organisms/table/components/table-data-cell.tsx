import clsx from 'clsx'
import type { TdHTMLAttributes } from 'react'

type TableDataProps = TdHTMLAttributes<HTMLTableCellElement>

const TableDataCell = ({ children, className, ...props }: TableDataProps) => {
  return (
    <td
      className={clsx(
        'px-4 py-1.5 py-2 text-sm text-gray-700 !font-light whitespace-normal',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export default TableDataCell

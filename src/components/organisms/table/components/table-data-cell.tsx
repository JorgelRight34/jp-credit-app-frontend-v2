import clsx from 'clsx'
import type { TdHTMLAttributes } from 'react'

type TableDataProps = TdHTMLAttributes<HTMLTableCellElement>

const TableDataCell = ({ children, className, ...props }: TableDataProps) => {
  return (
    <td
      className={clsx(
        'text-secondary px-3 py-2 text-xs whitespace-normal md:px-4 md:py-1.5 md:text-sm md:!font-light',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export default TableDataCell

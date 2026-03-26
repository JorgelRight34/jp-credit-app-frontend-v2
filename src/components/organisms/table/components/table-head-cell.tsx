import clsx from 'clsx'
import type { ThHTMLAttributes } from 'react'

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

const TableHeadCell = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <th
      className={clsx(
        'bg-surface-subtle text-primary px-3 py-2 text-xs font-normal whitespace-normal transition-colors md:px-4 md:text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export default TableHeadCell

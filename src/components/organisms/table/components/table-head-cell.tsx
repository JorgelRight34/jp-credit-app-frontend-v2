import clsx from 'clsx'
import type { ThHTMLAttributes } from 'react'

type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>

const TableHeadCell = ({ children, className, ...props }: TableHeadProps) => {
  return (
    <th
      className={clsx(
        'text-gray-950 text-sm bg-stone-50 font-normal transition-colors hover:bg-stone-200 px-4 py-2 whitespace-normal',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export default TableHeadCell

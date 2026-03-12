import clsx from 'clsx'
import type { TableHTMLAttributes } from 'react'

type TableProps = TableHTMLAttributes<HTMLTableElement>

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table
        className={clsx('border-collapse w-full rounded-xl', className)}
        style={{ minWidth: 'max-content' }}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export default Table

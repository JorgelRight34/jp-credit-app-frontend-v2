import clsx from 'clsx'
import type { TableHTMLAttributes } from 'react'

type TableProps = TableHTMLAttributes<HTMLTableElement>

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={clsx('w-full border-collapse', className)}
        style={{ minWidth: 'max-content' }}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export default Table

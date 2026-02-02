import clsx from 'clsx'
import type { TableHTMLAttributes } from 'react'

type TableProps = TableHTMLAttributes<HTMLTableElement>

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <table
      className={clsx('border-collapse overflow-x-auto rounded-xl', className)}
      style={{ width: 'max-content', minWidth: '100%' }}
      {...props}
    >
      {children}
    </table>
  )
}

export default Table

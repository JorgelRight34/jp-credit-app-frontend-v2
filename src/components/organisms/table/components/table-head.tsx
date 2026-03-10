import type { HTMLAttributes } from 'react'

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

const TableHead = ({ children, className, ...props }: TableHeaderProps) => {
  return (
    <thead
      className={`border-b bg-stone-50 !overflow-hidden rounded-t-xl ${className}`}
      {...props}
    >
      {children}
    </thead>
  )
}

export default TableHead

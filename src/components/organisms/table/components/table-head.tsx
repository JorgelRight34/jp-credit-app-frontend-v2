import type { HTMLAttributes } from 'react'

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

const TableHead = ({ children, ...props }: TableHeaderProps) => {
  return (
    <thead className="border-bottom rounded-xl" {...props}>
      {children}
    </thead>
  )
}

export default TableHead

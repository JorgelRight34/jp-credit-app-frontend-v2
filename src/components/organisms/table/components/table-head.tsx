import type { HTMLAttributes } from 'react'

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

const TableHead = ({
  children,
  className = '',
  ...props
}: TableHeaderProps) => {
  return (
    <thead
      className={`border-b !overflow-hidden rounded-t-xl ${className}`}
      {...props}
    >
      {children}
    </thead>
  )
}

export default TableHead

import type { HTMLAttributes } from 'react'

type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>

const TableHead = ({
  children,
  className = '',
  ...props
}: TableHeaderProps) => {
  return (
    <thead
      className={`bg-surface-subtle !overflow-hidden border-b ${className}`}
      {...props}
    >
      {children}
    </thead>
  )
}

export default TableHead

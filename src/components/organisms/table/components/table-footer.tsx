import type { HTMLAttributes } from 'react'

type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>

const TableFooter = ({ children, ...props }: TableFooterProps) => {
  return <tfoot {...props}>{children}</tfoot>
}

export default TableFooter

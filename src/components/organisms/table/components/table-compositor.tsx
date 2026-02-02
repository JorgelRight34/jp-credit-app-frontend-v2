import Table from './table'
import type { ReactNode } from 'react'

type TableCompositorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  head?: ReactNode
  body: ReactNode
  footer?: ReactNode
  navigation?: ReactNode
}

const TableCompositor = ({
  body,
  footer,
  head,
  navigation,
  className,
  ...props
}: TableCompositorProps) => {
  return (
    <div
      className="flex h-full flex-col rounded-xl border shadow-sm"
      {...props}
    >
      <div className="flex w-full flex-col !overflow-hidden rounded-xl">
        <Table className={className}>
          {head}
          {body}
          {footer}
        </Table>
      </div>
      <div className="flex-shrink-0 border-t">{navigation}</div>
    </div>
  )
}

export default TableCompositor

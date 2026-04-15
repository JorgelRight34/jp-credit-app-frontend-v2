import type { ReactNode } from 'react'

type TableContainerProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  navigation?: ReactNode
}

const TableContainer = ({
  children,
  navigation,
  ...props
}: TableContainerProps) => {
  return (
    <div
      className="flex flex-col !overflow-hidden rounded border shadow-sm"
      {...props}
    >
      <div className="flex w-full flex-col rounded-xl border">{children}</div>
      <div className="bg-surface flex-shrink-0 border-t">{navigation}</div>
    </div>
  )
}

export default TableContainer

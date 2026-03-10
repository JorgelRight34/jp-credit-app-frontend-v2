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
      className="flex h-full flex-col rounded-xl border shadow-sm"
      {...props}
    >
      <div className="flex w-full flex-col !overflow-hidden rounded-xl">
        {children}
      </div>
      <div className="flex-shrink-0 border-t">{navigation}</div>
    </div>
  )
}

export default TableContainer

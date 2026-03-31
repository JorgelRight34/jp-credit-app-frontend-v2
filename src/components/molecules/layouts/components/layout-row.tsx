import type { PropsWithChildren } from 'react'

const LayoutRow = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-6 md:flex-row">{children}</div>
}

export default LayoutRow

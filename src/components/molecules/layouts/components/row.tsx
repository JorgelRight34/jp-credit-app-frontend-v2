import type { PropsWithChildren } from 'react'

const Row = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-6 md:flex-row">{children}</div>
}

export default Row

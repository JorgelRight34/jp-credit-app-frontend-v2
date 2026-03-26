import { PropsWithChildren } from 'react'

const OverviewLayout = ({ children }: PropsWithChildren) => (
  <section className="flex h-full flex-col gap-6">{children}</section>
)

export default OverviewLayout

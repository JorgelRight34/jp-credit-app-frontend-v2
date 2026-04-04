import { PropsWithChildren } from 'react'

const MasterDetailLayout = ({ children }: PropsWithChildren) => (
  <div className="grid h-full gap-6 md:grid-cols-12">{children}</div>
)

MasterDetailLayout.Master = ({ children }: PropsWithChildren) => (
  <div className="col-span-12 flex flex-col gap-6 md:col-span-8">
    {children}
  </div>
)

MasterDetailLayout.MasterExpanded = ({ children }: PropsWithChildren) => (
  <div className="col-span-12 flex flex-col gap-6 md:col-span-8 md:row-span-2">
    {children}
  </div>
)

MasterDetailLayout.Detail = ({ children }: PropsWithChildren) => (
  <div className="col-span-12 flex flex-col gap-6 md:col-span-4 md:row-span-2">
    {children}
  </div>
)

MasterDetailLayout.MasterFooter = ({ children }: PropsWithChildren) => (
  <div className="col-span-12 flex flex-col gap-6 md:col-span-8">
    {children}
  </div>
)

export default MasterDetailLayout

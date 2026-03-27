import { PropsWithChildren } from 'react'

const MasterDetailLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 md:flex-row md:gap-0">
      {children}
    </div>
  )
}

MasterDetailLayout.Master = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full flex-col gap-6 md:w-8/12">{children}</div>
}

MasterDetailLayout.Detail = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full flex-col items-center gap-6 md:w-4/12 md:pl-6">
      {children}
    </div>
  )
}

export default MasterDetailLayout

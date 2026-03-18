import { PropsWithChildren } from 'react'

const FormMasterDetailLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:flex-row md:gap-0">
      {children}
    </div>
  )
}

FormMasterDetailLayout.Master = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full flex-col md:w-8/12">{children}</div>
}

FormMasterDetailLayout.Detail = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full justify-center md:block md:w-4/12 md:pl-6">
      {children}
    </div>
  )
}

export default FormMasterDetailLayout

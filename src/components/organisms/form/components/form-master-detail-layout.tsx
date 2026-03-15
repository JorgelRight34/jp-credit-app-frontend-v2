import { PropsWithChildren } from 'react'

const FormMasterDetailLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex gap-6 md:gap-0 flex-col w-full md:flex-row h-full">
      {children}
    </div>
  )
}

FormMasterDetailLayout.Master = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col w-full md:w-8/12">{children}</div>
}

FormMasterDetailLayout.Detail = ({ children }: PropsWithChildren) => {
  return (
    <div className="md:w-4/12 w-full justify-center flex md:block md:pl-6">
      {children}
    </div>
  )
}

export default FormMasterDetailLayout

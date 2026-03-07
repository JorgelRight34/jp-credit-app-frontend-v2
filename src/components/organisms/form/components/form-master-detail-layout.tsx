import { PropsWithChildren } from 'react'

const FormMasterDetailLayout = ({ children }: PropsWithChildren) => {
  return <div className="flex h-full">{children}</div>
}

FormMasterDetailLayout.Master = ({ children }: PropsWithChildren) => {
  return <div className="w-8/12">{children}</div>
}

FormMasterDetailLayout.Detail = ({ children }: PropsWithChildren) => {
  return <div className="w-4/12 pl-6">{children}</div>
}

export default FormMasterDetailLayout

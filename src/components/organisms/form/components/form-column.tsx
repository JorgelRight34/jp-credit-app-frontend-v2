import type { PropsWithChildren } from 'react'

const FormColumn = ({ children }: PropsWithChildren) => {
  return <div className="flex-1">{children}</div>
}

export default FormColumn

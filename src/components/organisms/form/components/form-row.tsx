import type { PropsWithChildren } from 'react'

const FormRow = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col md:flex-row gap-6 mb-6">{children}</div>
}

export default FormRow

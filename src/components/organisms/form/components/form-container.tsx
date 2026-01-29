import type { PropsWithChildren, ReactNode } from 'react'

type FormContainerProps = PropsWithChildren & {
  footer?: ReactNode
}

const FormContainer = ({ children, footer }: FormContainerProps) => {
  return (
    <section>
      <div className="flex gap-6 flex-col">{children}</div>
      <div className="pt-6">{footer}</div>
    </section>
  )
}

export default FormContainer

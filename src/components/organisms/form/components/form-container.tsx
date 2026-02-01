import type { PropsWithChildren, ReactNode } from 'react'

type FormContainerProps = PropsWithChildren & {
  footer?: ReactNode
}

const FormContainer = ({ children, footer }: FormContainerProps) => {
  return (
    <section className="!h-full w-full flex flex-col">
      <div className="flex flex-1 gap-6 flex-col">{children}</div>
      <div className="pt-6 flex-shrink-0">{footer}</div>
    </section>
  )
}

export default FormContainer

import clsx from 'clsx'
import type { PropsWithChildren, ReactNode } from 'react'

type FormContainerProps = PropsWithChildren & {
  footer?: ReactNode
  className?: string
}

const FormContainer = ({ children, className, footer }: FormContainerProps) => {
  return (
    <section className={clsx('!h-full w-full flex flex-col', className)}>
      <div className="flex flex-1 gap-6 flex-col">{children}</div>
      <div className="pt-6 flex-shrink-0">{footer}</div>
    </section>
  )
}

export default FormContainer

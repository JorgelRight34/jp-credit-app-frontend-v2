import clsx from 'clsx'
import { type PropsWithChildren, type ReactNode } from 'react'

type FormLayoutProps = PropsWithChildren & {
  className?: string
  errors?: ReactNode
  footer?: ReactNode
}

const FormContainerLayout = ({
  children,
  className,
  errors,
  footer,
}: FormLayoutProps) => {
  return (
    <section className={clsx('!h-full w-full flex flex-col', className)}>
      <div className="flex flex-1 gap-6 flex-col">{children}</div>
      {errors && <div className="flex-shrink-0">{errors}</div>}
      {footer && <div className="pt-6 flex-shrink-0">{footer}</div>}
    </section>
  )
}

export default FormContainerLayout

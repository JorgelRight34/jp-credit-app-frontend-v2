import clsx from 'clsx'
import { type PropsWithChildren, type ReactNode } from 'react'

type FormLayoutProps = PropsWithChildren & {
  className?: string
  errors?: ReactNode
  footer?: ReactNode
  onSubmit?: () => void
}

const FormLayout = ({
  children,
  className,
  errors,
  footer,
  onSubmit,
}: FormLayoutProps) => {
  return (
    <form
      className={clsx('!h-full w-full px-3 flex flex-col', className)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-1 gap-6 flex-col">{children}</div>
      {errors && <div className="flex-shrink-0">{errors}</div>}
      {footer && <div className="pt-6 flex-shrink-0">{footer}</div>}
    </form>
  )
}

export default FormLayout

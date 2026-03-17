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
      className={clsx('flex !h-full w-full flex-col', className)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-1 flex-col gap-6">{children}</div>
      {errors && <div className="flex-shrink-0">{errors}</div>}
      {footer && <div className="flex-shrink-0 pt-6">{footer}</div>}
    </form>
  )
}

export default FormLayout

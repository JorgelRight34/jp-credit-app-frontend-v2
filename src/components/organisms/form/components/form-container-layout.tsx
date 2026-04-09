import { useDataMutation } from '@/hooks/useMutate'
import clsx from 'clsx'
import { FormEvent, type PropsWithChildren, type ReactNode } from 'react'

type FormLayoutProps = PropsWithChildren & {
  className?: string
  errors?: ReactNode
  footer?: ReactNode
  noValidate?: boolean
  onError?: (err: unknown) => void
  onSubmit?: (e: FormEvent) => void
  onSuccess?: () => void
}

const FormLayout = ({
  children,
  className,
  errors,
  footer,
  noValidate = true,
  onSubmit,
  onError,
  onSuccess,
}: FormLayoutProps) => {
  const { mutateAsync } = useDataMutation({
    mutationFn: async (e: FormEvent) => await onSubmit?.(e),
    onSuccess,
    onError,
  })

  return (
    <form
      className={clsx('flex !h-full w-full flex-col', className)}
      onSubmit={mutateAsync}
      noValidate={noValidate}
    >
      <div className="flex flex-1 flex-col gap-6">{children}</div>
      <div className="flex-shrink-0">{errors}</div>
      <div className="flex-shrink-0 pt-6">{footer}</div>
    </form>
  )
}

export default FormLayout

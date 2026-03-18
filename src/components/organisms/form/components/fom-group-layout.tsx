import clsx from 'clsx'
import type { PropsWithChildren, ReactNode } from 'react'
import { FormLabel } from '@/components/atoms'

export interface FormGroupLayoutProps extends PropsWithChildren<{
  className?: string
}> {
  label: ReactNode
  name: string
}

const FormGroupLayout = ({
  label,
  children,
  name,
  className,
}: FormGroupLayoutProps) => {
  return (
    <div className={clsx('flex flex-1 flex-col items-start gap-2', className)}>
      <FormLabel className="w-full" htmlFor={name}>
        {label}
      </FormLabel>
      {children}
    </div>
  )
}

export const FormGroupLabel = ({
  label,
  optional,
}: {
  label: ReactNode
  optional?: boolean
}) => (
  <>
    {label}
    {optional !== true && <span className="text-accent">&nbsp;*</span>}
  </>
)

export default FormGroupLayout

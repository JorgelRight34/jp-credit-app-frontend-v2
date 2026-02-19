import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'
import { FormLabel } from '@/components/atoms'

export interface FormGroupLayoutProps extends HTMLAttributes<HTMLDivElement> {
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
    <div className={clsx('flex flex-1 items-start flex-col gap-2', className)}>
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

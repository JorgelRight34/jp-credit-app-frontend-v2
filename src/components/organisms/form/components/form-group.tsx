import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

type FormGroupProps = HTMLAttributes<HTMLDivElement>

const FormGroup = ({ children, className }: FormGroupProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>{children}</div>
  )
}

export default FormGroup

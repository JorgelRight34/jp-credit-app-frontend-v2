import clsx from 'clsx'
import FormInput from './form-input'
import type { FormGroupProps } from './form-group'
import type { FieldValues } from 'react-hook-form'
import type { ReactNode } from 'react'
import { FormLabel } from '@/components/atoms'

export type FormGroupHorizontalProps<T extends FieldValues> =
  FormGroupProps<T> & {
    description?: ReactNode
  }

const FormGroupHorizontal = <T extends FieldValues>({
  name,
  label,
  className,
  type,
  required = true,
  inputClassName = 'w-full',
  description,
  input,
  ...props
}: FormGroupHorizontalProps<T>) => {
  return (
    <section>
      <div className={clsx('flex flex-1 items-center gap-4', className)}>
        <FormLabel htmlFor={name as string}>
          {label}
          {!required && <span className="text-accent">&nbsp;*&nbsp;</span>}:
        </FormLabel>
        <FormInput
          {...props}
          className={inputClassName}
          type={type}
          name={name}
          as={input}
        />
      </div>
      {description}
    </section>
  )
}

export default FormGroupHorizontal

import { Controller } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import type { ReactNode } from 'react'
import type { InputProps } from '@/components/atoms'

export interface FormInputProps<T extends FieldValues> extends Omit<
  InputProps,
  'name'
> {
  name: keyof T
  as: (props: {
    value: unknown
    onChange: (e: unknown) => unknown
  }) => ReactNode
}

const FormInput = <T extends FieldValues>({
  as,
  name,
  ...props
}: FormInputProps<T>) => {
  const Component = as

  return (
    <Controller
      name={name as string}
      render={({ field }) => {
        return <Component {...props} {...field} />
      }}
    />
  )
}

export default FormInput

import { Controller, useFormState } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import type { ReactNode } from 'react'
import { InputProps } from '@/components/atoms'

export type FormInputProps<
  T extends FieldValues,
  TInput extends InputProps = InputProps,
> = {
  name: keyof T
  as: (props: TInput) => ReactNode
} & Omit<TInput, 'value' | 'onChange' | 'ref'>

const FormInput = <
  T extends FieldValues,
  TInput extends InputProps = InputProps,
>({
  as,
  name,
  ...props
}: FormInputProps<T, TInput>) => {
  const { errors } = useFormState()

  const Component = as

  return (
    <Controller
      name={name as string}
      render={({ field }) => (
        <Component
          {...(props as unknown as TInput)}
          {...(field as unknown as Partial<TInput>)}
          error={!!errors[name as keyof typeof errors]}
        />
      )}
    />
  )
}

export default FormInput

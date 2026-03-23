import { useController } from 'react-hook-form'
import type { FieldValues, Path } from 'react-hook-form'
import type { ReactNode } from 'react'
import { InputProps } from '@/components/atoms'
import { useFormControl } from '../providers/form-provider'

export type FormInputProps<
  T extends FieldValues,
  TInput extends InputProps = InputProps,
> = {
  name: Path<T>
  error?: boolean
  as: (props: TInput) => ReactNode
} & Omit<TInput, 'value' | 'onChange' | 'ref'>

const FormInput = <
  T extends FieldValues,
  TInput extends InputProps = InputProps,
>({
  as: Component,
  name,
  error,
  ...props
}: FormInputProps<T, TInput>) => {
  const control = useFormControl()
  const { field } = useController({ control, name })

  return (
    <Component
      {...(props as unknown as TInput)}
      {...(field as unknown as Partial<TInput>)}
      name={name}
      error={error}
    />
  )
}

export default FormInput

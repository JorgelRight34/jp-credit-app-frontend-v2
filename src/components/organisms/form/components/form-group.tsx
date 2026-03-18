import FormInput from './form-input'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import { InputProps } from '@/components/atoms'

export type FormGroupProps<
  T extends FieldValues,
  TInput extends InputProps = InputProps,
> = FormGroupLayoutProps &
  Omit<FormInputProps<T, TInput>, 'as'> & {
    label: string
    inputClassName?: string
    optional?: boolean
    input: FormInputProps<T, TInput>['as']
  }

const FormGroup = <
  T extends FieldValues,
  TInput extends InputProps = InputProps,
>({
  name,
  label,
  className,
  type,
  optional = false,
  inputClassName = 'w-full',
  input,
  ...props
}: FormGroupProps<T, TInput>) => {
  return (
    <FormGroupLayout
      name={name as string}
      className={className}
      label={<FormGroupLabel label={label} optional={optional} />}
    >
      <FormInput
        {...(props as any)}
        required={!optional}
        className={inputClassName}
        type={type}
        name={name as string}
        id={name as string}
        as={input}
      />
    </FormGroupLayout>
  )
}

export default FormGroup

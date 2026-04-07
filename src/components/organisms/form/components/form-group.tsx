import FormInput from './form-input'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import { useFormState, type FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import { InputProps, Paragraph } from '@/components/atoms'
import { useFormControl } from '../providers/form-provider'

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
      name={name}
      className={className}
      label={<FormGroupLabel label={label} optional={optional} />}
    >
      <FormGroupInput
        {...(props as any)}
        required={!optional}
        className={inputClassName}
        type={type}
        name={name}
        id={name}
        as={input}
      />
    </FormGroupLayout>
  )
}

const FormGroupInput = ({ name, ...props }: InputProps) => {
  const control = useFormControl()
  const { errors } = useFormState({ control })
  const error = errors[name as keyof typeof errors]

  return (
    <>
      <FormInput {...(props as any)} name={name} error={!!error} />
      {error?.message && (
        <Paragraph className="text-red-500">
          {error?.message?.toString()}
        </Paragraph>
      )}
    </>
  )
}

export default FormGroup

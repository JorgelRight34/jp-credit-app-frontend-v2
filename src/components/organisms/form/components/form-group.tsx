import FormInput from './form-input'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import type { FormGroupLayoutProps } from './fom-group-layout'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'

export type FormGroupProps<T extends FieldValues> = FormGroupLayoutProps &
  Omit<FormInputProps<T>, 'as'> & {
    label: string
    inputClassName?: string
    optional?: boolean
    input: FormInputProps<T>['as']
  }

const FormGroup = <T extends FieldValues>({
  name,
  label,
  className,
  type,
  optional = false,
  inputClassName = 'w-full bg-white',
  input,
  ...props
}: FormGroupProps<T>) => {
  return (
    <FormGroupLayout
      name={name}
      className={className}
      label={<FormGroupLabel label={label} optional={optional} />}
    >
      <FormInput
        {...props}
        required={!optional}
        className={inputClassName}
        type={type}
        name={name}
        as={input}
      />
    </FormGroupLayout>
  )
}

export default FormGroup

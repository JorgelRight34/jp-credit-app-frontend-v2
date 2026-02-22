import FormWatchInput from './form-watch-input'
import type { FormWatchInputProps } from './form-watch-input'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import FormGroupLayout, { FormGroupLabel } from './fom-group-layout'
import { FormGroupProps } from './form-group'

export type FormWatchGroupProps<T extends FieldValues> = FormGroupProps<T> &
  Omit<FormWatchInputProps<T>, 'as'> & {
    label: string
    input: FormInputProps<T>['as']
  }

const FormWatchGroup = <T extends FieldValues>({
  name,
  label,
  watchedValues,
  optional,
  onWacthedValuesChange,
  input,
  ...props
}: FormWatchGroupProps<T>) => {
  return (
    <FormGroupLayout
      label={<FormGroupLabel label={label} optional={optional} />}
      name={name}
      {...props}
    >
      <FormWatchInput
        watchedValues={watchedValues}
        onWacthedValuesChange={onWacthedValuesChange}
        className="w-full"
        name={name}
        as={input}
      />
    </FormGroupLayout>
  )
}

export default FormWatchGroup

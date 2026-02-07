import FormGroup from './form-group'
import type { SelectOptions } from '@/components/atoms'
import type { FormGroupProps } from './form-group'
import type { FieldValues } from 'react-hook-form'
import { Select } from '@/components/atoms'

type FormSelectGroupProps<T extends FieldValues> = Omit<
  FormGroupProps<T>,
  'input'
> & {
  options: SelectOptions
}

const FormSelectGroup = <T extends FieldValues>({
  options,
  ...props
}: FormSelectGroupProps<T>) => {
  return (
    <FormGroup {...props} input={(p) => <Select {...p} options={options} />} />
  )
}

export default FormSelectGroup

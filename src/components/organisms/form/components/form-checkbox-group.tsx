import FormGroupHorizontal from './form-group-horizontal'
import type { FieldValues } from 'react-hook-form'
import type { FormGroupHorizontalProps } from './form-group-horizontal'
import { Checkbox } from '@/components/atoms'

type FormCheckboxGroupProps<T extends FieldValues> = Omit<
  FormGroupHorizontalProps<T>,
  'type' | 'input'
>

const FormCheckboxGroup = <T extends FieldValues>({
  ...props
}: FormCheckboxGroupProps<T>) => {
  return (
    <FormGroupHorizontal {...props} inputClassName="inline" input={Checkbox} />
  )
}

export default FormCheckboxGroup

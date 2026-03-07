import FormGroup from './form-group'
import type { FileInputProps } from '@/components/atoms'
import type { FormGroupProps } from './form-group'
import type { FieldValues } from 'react-hook-form'
import { FileInput } from '@/components/atoms'

type FormFileGroupProps<T extends FieldValues> = Omit<
  FormGroupProps<T>,
  'input'
> &
  FileInputProps

const FormFileGroup = <T extends FieldValues>({
  ...props
}: FormFileGroupProps<T>) => {
  return <FormGroup {...props} input={FileInput} />
}

export default FormFileGroup

import clsx from 'clsx'
import FormInput from './form-input'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import type { HTMLAttributes } from 'react'
import { FormLabel } from '@/components/atoms'

type FormGroupProps<T extends FieldValues> = HTMLAttributes<HTMLDivElement> &
  Omit<FormInputProps<T>, 'as'> & {
    label: string
    input: FormInputProps<T>['as']
  }

const FormGroup = <T extends FieldValues>({
  name,
  label,
  className,
  type,
  input,
}: FormGroupProps<T>) => {
  return (
    <div className={clsx('flex flex-1 items-start flex-col gap-2', className)}>
      <FormLabel htmlFor={name as string}>{label}</FormLabel>
      <FormInput className="w-full" type={type} name={name} as={input} />
    </div>
  )
}

export default FormGroup

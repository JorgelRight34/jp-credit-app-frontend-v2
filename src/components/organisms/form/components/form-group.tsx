import clsx from 'clsx'
import FormInput from './form-input'
import type { FormInputProps } from './form-input'
import type { HTMLAttributes } from 'react'
import { FormLabel } from '@/components/atoms'

type FormGroupProps = HTMLAttributes<HTMLDivElement> &
  Omit<FormInputProps, 'as'> & {
    label: string
    input: FormInputProps['as']
  }

const FormGroup = ({ name, label, className, input }: FormGroupProps) => {
  return (
    <div className={clsx('flex items-start flex-col gap-2', className)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormInput className="w-full" name={name} as={input} />
    </div>
  )
}

export default FormGroup

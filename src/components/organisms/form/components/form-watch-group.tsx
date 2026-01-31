import clsx from 'clsx'
import FormWatchInput from './form-watch-input'
import type { FormWatchInputProps } from './form-watch-input'
import type { FieldValues } from 'react-hook-form'
import type { FormInputProps } from './form-input'
import type { HTMLAttributes } from 'react'
import { FormLabel } from '@/components/atoms'

type FormWatchGroupProps<T extends FieldValues> =
  HTMLAttributes<HTMLDivElement> &
    Omit<FormWatchInputProps<T>, 'as'> & {
      label: string
      input: FormInputProps<T>['as']
    }

const FormWatchGroup = <T extends FieldValues>({
  name,
  label,
  className,
  watchedValues,
  onWacthedValuesChange,
  input,
}: FormWatchGroupProps<T>) => {
  return (
    <div className={clsx('flex flex-1 items-start flex-col gap-2', className)}>
      <FormLabel htmlFor={name as string}>{label}</FormLabel>
      <FormWatchInput
        watchedValues={watchedValues}
        onWacthedValuesChange={onWacthedValuesChange}
        className="w-full"
        name={name}
        as={input}
      />
    </div>
  )
}

export default FormWatchGroup

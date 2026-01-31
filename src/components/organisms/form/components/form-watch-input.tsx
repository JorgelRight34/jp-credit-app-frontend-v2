import { useFormContext, useWatch } from 'react-hook-form'
import { useEffect } from 'react'
import FormInput from './form-input'
import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form'
import type { FormInputProps } from './form-input'

export type FormWatchInputProps<T extends FieldValues> = FormInputProps<T> & {
  watchedValues: ReadonlyArray<Path<T>>
  onWacthedValuesChange: (form: T, setForm: UseFormSetValue<T>) => void
}

const FormWatchInput = <T extends FieldValues>({
  watchedValues,
  onWacthedValuesChange,
  ...props
}: FormWatchInputProps<T>) => {
  const { control, getValues, setValue } = useFormContext<T>()
  const watch = useWatch({
    name: watchedValues,
    control,
  })

  useEffect(() => {
    onWacthedValuesChange(getValues(), setValue)
  }, [watch])

  return <FormInput {...props} />
}

export default FormWatchInput

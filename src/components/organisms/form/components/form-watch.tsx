import { ReactNode } from 'react'
import { FieldValues, Path, useWatch } from 'react-hook-form'
import { UseFormBuilderReturn } from '../models/useFormBuilderReturn'

export interface FormSubscriptionWrapperProps<T extends FieldValues> {
  names: ReadonlyArray<Path<T>>
  form: UseFormBuilderReturn<T>
  render: (values: any[]) => ReactNode
}

const FormWatch = <T extends FieldValues>({
  names,
  form,
  render,
}: FormSubscriptionWrapperProps<T>) => {
  const watchedValues = useWatch({
    name: names,
    control: form.form.control,
  })

  return render(watchedValues)
}

export default FormWatch

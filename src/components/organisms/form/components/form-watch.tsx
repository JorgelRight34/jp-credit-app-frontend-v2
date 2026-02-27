import { ReactNode } from 'react'
import { FieldValues, Path, useWatch } from 'react-hook-form'
import { UseFormReturn } from '../hooks/useFormMethods'

export interface FormSubscriptionWrapperProps<T extends FieldValues> {
  names: ReadonlyArray<Path<T>>
  form: UseFormReturn<T>
  render: (values: any[]) => ReactNode
}

const FormWatch = <T extends FieldValues>({
  names,
  form,
  render,
}: FormSubscriptionWrapperProps<T>) => {
  const watchedValues = useWatch({
    name: names,
    control: form.control,
  })

  return render(watchedValues)
}

export default FormWatch

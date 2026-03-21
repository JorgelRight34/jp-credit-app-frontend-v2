import { PropsWithChildren, useEffect } from 'react'
import {
  FieldValues,
  Path,
  useFormContext,
  UseFormReturn,
  useWatch,
} from 'react-hook-form'

export type WatchedValuesChangeHandler<T extends FieldValues> = (
  form: UseFormReturn<T, any, T>,
) => void

export interface FormWatchContainerProps<
  T extends FieldValues,
> extends PropsWithChildren {
  watchedValues: ReadonlyArray<Path<T>>
  onWatchedValuesChange: WatchedValuesChangeHandler<T>
}

const FormWatchContainer = <T extends FieldValues>({
  watchedValues,
  children,
  onWatchedValuesChange,
}: FormWatchContainerProps<T>) => {
  const context = useFormContext<T>()
  const watch = useWatch({
    name: watchedValues,
    control: context.control,
  })

  useEffect(() => {
    onWatchedValuesChange(context)
  }, [watch])

  return children
}

export default FormWatchContainer

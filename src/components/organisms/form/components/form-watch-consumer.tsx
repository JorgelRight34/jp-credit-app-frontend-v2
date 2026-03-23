import { PropsWithChildren, useEffect, useMemo, useRef } from 'react'
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  ReadFormState,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form'
import { useFormControl, useFormSetValue } from '../providers/form-provider'

export type WatchedValuesChangeHandler<T extends FieldValues> = (
  form: {
    getValues: () => T
    setValue: UseFormSetValue<T>
    state: ReadFormState
    control: Control<T, unknown, T>
  },
  prev: PathValue<T, Path<T>>[],
) => void

export interface FormWatchConsumerProps<
  T extends FieldValues,
> extends PropsWithChildren {
  watchedValues: ReadonlyArray<Path<T>>
  onWatchedValuesChange: WatchedValuesChangeHandler<T>
}

const FormWatchConsumer = <T extends FieldValues>({
  watchedValues,
  children,
  onWatchedValuesChange,
}: FormWatchConsumerProps<T>) => {
  const control = useFormControl<T>()
  const watch = useWatch({
    name: watchedValues,
    control: control,
  })
  const prevWatchRef = useRef<typeof watch>(watch)
  const setValue = useFormSetValue<T>()

  const context = useMemo(
    () => ({
      control,
      state: control._proxyFormState,
      getValues: () => control._formValues as T,
      setValue,
    }),
    [control],
  )
  useEffect(() => {
    onWatchedValuesChange(context, prevWatchRef.current)
    prevWatchRef.current = watch
  }, [watch])

  return children
}

export default FormWatchConsumer

import { PropsWithChildren, useEffect, useMemo } from 'react'
import {
  Control,
  FieldValues,
  Path,
  UseFormSetValue,
  useFormState,
  UseFormStateReturn,
  useWatch,
} from 'react-hook-form'
import { useFormControl, useFormSetValue } from '../providers/form-provider'

export type WatchedValuesChangeHandler<T extends FieldValues> = (form: {
  state: UseFormStateReturn<FieldValues>
  getValues: () => T
  setValue: UseFormSetValue<T>
  control: Control<T, unknown, T>
}) => void

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
  const control = useFormControl<T>()
  const setValue = useFormSetValue<T>()
  const state = useFormState({ control })
  const watch = useWatch({
    name: watchedValues,
    control: control,
  })

  const context = useMemo(
    () => ({
      control,
      state,
      getValues: () => control._formValues as T,
      setValue,
    }),
    [control, state],
  )

  useEffect(() => {
    onWatchedValuesChange(context)
  }, [watch])

  return children
}

export default FormWatchContainer

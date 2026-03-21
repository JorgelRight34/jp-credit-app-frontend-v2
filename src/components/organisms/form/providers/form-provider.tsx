import { createContext, useContext } from 'react'
import type { FieldValues, Control, UseFormSetValue } from 'react-hook-form'

const FormControlContext = createContext<Control<
  any,
  unknown,
  FieldValues
> | null>(null)

const FormSetValueContext = createContext<UseFormSetValue<any> | null>(null)

interface FormControlProviderProps<T extends FieldValues> {
  control: Control<T, unknown, T>
  setValue: UseFormSetValue<T>
  children: React.ReactNode
}

export const FormProvider = <T extends FieldValues>({
  control,
  setValue,
  children,
}: FormControlProviderProps<T>) => {
  return (
    <FormControlContext.Provider value={control}>
      <FormSetValueContext.Provider value={setValue}>
        {children}
      </FormSetValueContext.Provider>
    </FormControlContext.Provider>
  )
}

export const useFormControl = <T extends FieldValues>() => {
  const ctx = useContext(FormControlContext)

  if (ctx == null) throw Error('Must use this inside a FormControlProvider.')

  return ctx as Control<T, unknown, T>
}

export const useFormSetValue = <T extends FieldValues>() => {
  const ctx = useContext(FormSetValueContext)
  if (ctx == null) throw Error('Must use this inside a FormControlProvider.')
  return ctx as UseFormSetValue<T>
}

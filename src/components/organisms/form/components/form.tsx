import React from 'react'
import type { FieldValues } from 'react-hook-form'
import { UseFormReturn } from '../hooks/useFormMethods'
import { FormProvider } from '../providers/form-provider'

type FormProps<T extends FieldValues> = {
  children: React.ReactNode
  form: UseFormReturn<T>
  className?: string
}

const Form = <T extends FieldValues>({
  className = '',
  form,
  children,
}: FormProps<T>) => {
  return (
    <section className={`flex w-full flex-1 flex-col ${className}`}>
      <FormProvider setValue={form.setValue} control={form.control}>
        {children}
      </FormProvider>
    </section>
  )
}

export default Form

import React, { forwardRef, useImperativeHandle } from 'react'
import { FormProvider } from 'react-hook-form'
import clsx from 'clsx'
import type { FormRef } from '../models/fomRef'
import type { FieldValues } from 'react-hook-form'
import type { ReactElement } from 'react'

type FormProps<T extends FieldValues> = {
  children: React.ReactNode
  form: UseFormReturn<T>
  className?: string
}

function InnerForm<T extends FieldValues>(
  { children, className = 'h-full', form }: FormProps<T>,
  ref: React.Ref<FormRef<T>>,
) {
  useImperativeHandle(ref, () => ({
    control: form.control,
    validate: form.validate,
    getValues: form.getValues,
    setValue: form.setValue,
    submit: () => form.submit(),
    handleSubmit: form.handleSubmit,
    reset: () => form.reset(),
  }))

  return (
    <form className={clsx('flex w-full flex-col', className)}>
      <FormProvider {...form.methods}>{children}</FormProvider>
    </form>
  )
}

const Form = forwardRef(InnerForm) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<FormRef<T>> },
) => ReactElement

export default Form

import React, { forwardRef, useImperativeHandle } from 'react'
import type { FormRef } from '../models/fomRef'
import type { FieldValues } from 'react-hook-form'
import type { ReactElement } from 'react'
import { UseFormReturn } from '../hooks/useFormMethods'
import Form from './form'

type FormProps<T extends FieldValues> = {
  children: React.ReactNode
  form: UseFormReturn<T>
  className?: string
}

function InnerForm<T extends FieldValues>(
  { form, children, ...props }: FormProps<T>,
  ref: React.Ref<FormRef<T>>,
) {
  useImperativeHandle(
    ref,
    () => ({
      control: form.control,
      validate: form.validate,
      getValues: form.getValues,
      setValue: form.setValue,
      submit: form.submit,
      handleSubmit: form.handleSubmit,
      reset: form.reset,
    }),
    [form],
  )

  return (
    <Form form={form} {...props}>
      {children}
    </Form>
  )
}

const FormWithRef = forwardRef(InnerForm) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<FormRef<T>> },
) => ReactElement

export default FormWithRef

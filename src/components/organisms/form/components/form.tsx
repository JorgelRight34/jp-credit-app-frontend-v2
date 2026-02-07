import React, { forwardRef, useImperativeHandle } from 'react'
import { FormProvider } from 'react-hook-form'
import clsx from 'clsx'
import type { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import type { FormRef } from '../models/fomRef'
import type { FieldValues } from 'react-hook-form'
import type { ReactElement } from 'react'

type FormProps<T extends FieldValues> = {
  children: React.ReactNode
  form: UseFormBuilderReturn<T>
  className?: string
}

function InnerForm<T extends FieldValues>(
  {
    children,
    className = 'h-full',
    form: { form, validation, state },
  }: FormProps<T>,
  ref: React.Ref<FormRef<T>>,
) {
  useImperativeHandle(ref, () => ({
    control: form.control,
    applyInterceptors: form.applyInterceptors,
    isDirty: () => state.isDirty,
    validate: form.validate,
    getValues: form.getValues,
    setValue: form.setValue,
    watch: form.watch,
    submit: () => form.handleSubmit(),
    reset: () => form.reset(),
  }))

  return (
    <form className={clsx('flex w-full flex-col', className)}>
      <FormProvider {...form.methods}>
        <aside className="flex-1">{children}</aside>
        <FormErrors validation={validation} />
      </FormProvider>
    </form>
  )
}

const Form = forwardRef(InnerForm) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.Ref<FormRef<T>> },
) => ReactElement

const FormErrors = <T extends FieldValues>({
  validation: { formErrors, apiErrors },
}: {
  validation: UseFormBuilderReturn<T>['validation']
}) => {
  return (
    <>
      {apiErrors.length > 0 && (
        <ul className="list-disc">
          {apiErrors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
      {
        <ul className="list-disc">
          {formErrors.map((err, index) => (
            <li key={index}>
              {err.src} - {err.message}
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default Form

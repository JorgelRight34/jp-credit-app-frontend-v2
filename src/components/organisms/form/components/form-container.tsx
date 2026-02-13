import clsx from 'clsx'
import { type PropsWithChildren, type ReactNode } from 'react'
import FormErrorsPanel from './form-errors-panel'
import { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import { FieldValues, useFormState } from 'react-hook-form'
import FormContainerButtons from './form-container-buttons'

type FormContainerProps<T extends FieldValues> = PropsWithChildren & {
  form?: UseFormBuilderReturn<T>
  footer?: ReactNode
  className?: string
  onSubmit?: () => unknown
}

const FormContainer = <T extends FieldValues>({
  form,
  children,
  className,
  footer,
}: FormContainerProps<T>) => {
  const { isDirty } = useFormState({ control: form?.form.control })

  return (
    <section className={clsx('!h-full w-full flex flex-col', className)}>
      <div className="flex flex-1 gap-6 flex-col">{children}</div>
      <div className="flex-shrink-0">
        {form && (
          <FormErrorsPanel
            control={form.form.control}
            mutationError={form.state.error}
          />
        )}
      </div>
      <div className="pt-6 flex-shrink-0">
        {footer ?? <FormContainerButtons form={form} isDirty={isDirty} />}
      </div>
    </section>
  )
}

export default FormContainer

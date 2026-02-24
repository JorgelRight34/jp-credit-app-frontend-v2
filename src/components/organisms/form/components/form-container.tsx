import { type PropsWithChildren, type ReactNode } from 'react'
import { FieldValues, useFormState } from 'react-hook-form'
import FormErrorsPanel from './form-errors-panel'
import FormContainerButtons from './form-container-buttons'
import { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import FormLayout from './form-container-layout'

type FormContainerProps<T extends FieldValues> = PropsWithChildren & {
  form: UseFormBuilderReturn<T>
  className?: string
  initializeAsDirty?: boolean
  onSubmit?: () => void
  footer?: (isDirty: boolean) => ReactNode
}

const FormContainer = <T extends FieldValues>({
  form,
  children,
  className,
  initializeAsDirty,
  onSubmit = form.form.submit,
  footer,
}: FormContainerProps<T>) => {
  const { isDirty } = useFormState({ control: form.form.control })

  return (
    <FormLayout
      className={className}
      errors={
        <FormErrorsPanel
          control={form.form.control}
          mutationError={form.state.error}
        />
      }
      footer={
        footer ? (
          footer(isDirty)
        ) : (
          <FormContainerButtons
            form={form}
            onSubmit={onSubmit}
            isDirty={isDirty || initializeAsDirty}
          />
        )
      }
    >
      {children}
    </FormLayout>
  )
}

export default FormContainer

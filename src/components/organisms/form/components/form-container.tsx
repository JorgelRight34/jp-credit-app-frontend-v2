import { type PropsWithChildren, type ReactNode } from 'react'
import { FieldValues, useFormState } from 'react-hook-form'
import FormErrorsPanel from './form-errors-panel'
import FormContainerButtons from './form-container-buttons'
import FormLayout from './form-container-layout'
import { UseFormReturn } from '../hooks/useFormMethods'

type FormContainerProps<T extends FieldValues> = PropsWithChildren & {
  form: UseFormReturn<T>
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
  onSubmit = form.submit,
  footer,
}: FormContainerProps<T>) => {
  const { isDirty, errors } = useFormState({ control: form.control })

  return (
    <FormLayout
      className={className}
      onSubmit={onSubmit}
      errors={<FormErrorsPanel control={form.control} mutationError={errors} />}
      footer={
        footer ? (
          footer(isDirty)
        ) : (
          <FormContainerButtons
            form={form}
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

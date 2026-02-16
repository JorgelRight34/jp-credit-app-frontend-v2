import { type PropsWithChildren, type ReactNode } from 'react'
import { FieldValues, useFormState } from 'react-hook-form'
import FormErrorsPanel from './form-errors-panel'
import FormContainerButtons from './form-container-buttons'
import { UseFormBuilderReturn } from '../models/useFormBuilderReturn'
import FormContainerLayout from './form-container-layout'

type FormContainerProps<T extends FieldValues> = PropsWithChildren & {
  form: UseFormBuilderReturn<T>
  className?: string
  footer?: (isDirty: boolean) => ReactNode
}

const FormContainer = <T extends FieldValues>({
  form,
  children,
  className,
  footer,
}: FormContainerProps<T>) => {
  const { isDirty } = useFormState({ control: form.form.control })

  return (
    <FormContainerLayout
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
          <FormContainerButtons form={form} isDirty={isDirty} />
        )
      }
    >
      {children}
    </FormContainerLayout>
  )
}

export default FormContainer

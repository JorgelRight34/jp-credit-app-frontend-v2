import { useState, type PropsWithChildren } from 'react'
import { FieldValues } from 'react-hook-form'
import FormErrorsPanel from './form-errors-panel'
import FormContainerButtons from './form-container-buttons'
import FormLayout from './form-container-layout'
import { UseFormReturn } from '../hooks/useFormMethods'

type FormContainerProps<T extends FieldValues> = PropsWithChildren & {
  form: UseFormReturn<T>
  className?: string
  initializeAsDirty?: boolean
  isValid?: boolean
  onSubmit?: () => void
}

const FormContainer = <T extends FieldValues>({
  form,
  children,
  className,
  initializeAsDirty,
  onSubmit = form.submit,
}: FormContainerProps<T>) => {
  const [mutationError, setMutationError] = useState<unknown>()

  return (
    <FormLayout
      className={className}
      onSubmit={onSubmit}
      onError={setMutationError}
      errors={
        <FormErrorsPanel control={form.control} mutationError={mutationError} />
      }
      footer={
        <FormContainerButtons
          form={form}
          initializeAsDirty={initializeAsDirty}
        />
      }
    >
      {children}
    </FormLayout>
  )
}

export default FormContainer

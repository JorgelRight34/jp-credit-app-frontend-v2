import { useState, type PropsWithChildren } from 'react'
import { FieldValues } from 'react-hook-form'
import FormContainerButtons from './form-container-buttons'
import FormContainerLayout from './form-container-layout'
import { UseFormReturn } from '../hooks/useFormMethods'
import FormErrorsPanel from './form-errors-panel'

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
    <FormContainerLayout
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
    </FormContainerLayout>
  )
}

export default FormContainer

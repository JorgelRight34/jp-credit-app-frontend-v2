import { type PropsWithChildren } from 'react'
import { FieldValues } from 'react-hook-form'
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
  return (
    <FormLayout
      className={className}
      onSubmit={onSubmit}
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

import { useState } from 'react'
import { useChangePasswordForm } from '../hooks/useChangePassword'
import type { ChangePasswordSchemaType } from '../lib/schemas/changePasswordSchema'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  FormSubmitBtn,
  PasswordInput,
} from '@/components'

export type ChangePasswordFormProps = DataModuleFormProps<
  null,
  ChangePasswordSchemaType
>

const ChangePasswordForm = ({ initialValues }: ChangePasswordFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useChangePasswordForm({
    initialValues,
    onDirtyChange: setIsDirty,
  })

  return (
    <FormContainer footer={<FormSubmitBtn isDirty={isDirty} form={form} />}>
      <Form form={form}>
        <FormRow>
          <FormGroup
            name="password"
            label="Nueva contraseña"
            input={PasswordInput}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            name="confirmation"
            label="Confirmación"
            input={PasswordInput}
          />
        </FormRow>
      </Form>
    </FormContainer>
  )
}

export default ChangePasswordForm

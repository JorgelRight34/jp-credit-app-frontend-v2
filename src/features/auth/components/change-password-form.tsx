import { useChangePasswordForm } from '../hooks/useChangePassword'
import type { ChangePasswordSchemaType } from '../lib/schemas/changePasswordSchema'
import type { UseDataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  FormSubmitBtn,
  PasswordInput,
} from '@/components'

export type ChangePasswordFormProps = UseDataModuleFormProps<
  null,
  ChangePasswordSchemaType
>

const ChangePasswordForm = ({ initialValues }: ChangePasswordFormProps) => {
  const form = useChangePasswordForm({ initialValues })

  return (
    <FormContainer footer={<FormSubmitBtn form={form} />}>
      <Form form={form}>
        <FormRow>
          <FormGroup name="password" label="Contraseña" input={PasswordInput} />
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

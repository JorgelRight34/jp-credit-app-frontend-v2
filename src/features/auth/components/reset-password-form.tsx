import { useResetPasswordForm } from '../hooks/useResetPassword'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  PasswordInput,
} from '@/components'
import { User } from '../../../models/user'
import { ResetPassworFormValues } from '../lib/schemas/resetPasswordSchema'

export type ResetPasswordFormProps = DataModuleFormProps<
  null,
  ResetPassworFormValues
> & {
  user: User
}

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const form = useResetPasswordForm(props)

  return (
    <FormContainer form={form}>
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

export default ResetPasswordForm

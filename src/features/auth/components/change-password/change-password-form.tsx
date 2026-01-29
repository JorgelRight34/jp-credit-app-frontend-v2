import { useChangePasswordForm } from '../../hooks/useChangePassword'
import type { User } from '../../models/user'
import { Form, FormGroup, PasswordInput } from '@/components'

export interface ChangePasswordFormProps {
  user: User
}

const ChangePasswordForm = ({ user }: ChangePasswordFormProps) => {
  const form = useChangePasswordForm({ user })

  return (
    <Form form={form}>
      <FormGroup name="password" label="Contraseña" input={PasswordInput} />
      <FormGroup
        name="confirmation"
        label="Confirmación"
        input={PasswordInput}
      />
    </Form>
  )
}

export default ChangePasswordForm

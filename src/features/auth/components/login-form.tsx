import { useLoginForm } from '../hooks/useLoginForm'
import type { LoginResult } from '../models/loginResult'
import type { LoginSchemaType } from '../lib/schemas/loginSchema'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  FormSubmitBtn,
  Input,
  LoginIcon,
  PasswordInput,
} from '@/components'

const LoginForm = (
  props: DataModuleFormProps<LoginResult, LoginSchemaType>,
) => {
  const form = useLoginForm(props)

  return (
    <FormContainer
      form={form}
      footer={(isDirty) => (
        <FormSubmitBtn
          isDirty={isDirty}
          text="Iniciar sesión"
          icon={LoginIcon}
          onSubmit={form.submit}
        />
      )}
    >
      <Form form={form}>
        <FormRow>
          <FormGroup label="Usuario" name="username" input={Input} />
        </FormRow>
        <FormGroup
          label="Contraseña"
          name="password"
          autoComplete="new-password"
          input={PasswordInput}
        />
      </Form>
    </FormContainer>
  )
}

export default LoginForm

import { LoginFormValues, useLoginForm } from '../hooks/useLoginForm'
import type { LoginResult } from '../models/loginResult'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  FormSubmitBtn,
  Icon,
  Input,
  LoginIcon,
  PasswordInput,
} from '@/components'

const LoginForm = (
  props: DataModuleFormProps<LoginResult, LoginFormValues>,
) => {
  const form = useLoginForm(props)

  return (
    <FormContainer
      form={form}
      footer={(isDirty) => (
        <FormSubmitBtn isDirty={isDirty}>
          <Icon icon={LoginIcon}>Iniciar sesión</Icon>
        </FormSubmitBtn>
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

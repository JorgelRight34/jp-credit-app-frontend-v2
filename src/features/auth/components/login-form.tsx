import { LoginFormValues, useLoginForm } from '../hooks/useLoginForm'
import type { LoginResult } from '../models/loginResult'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormGroup,
  FormLayout,
  FormRow,
  FormSubmitBtn,
  Icon,
  Input,
  LoginIcon,
  NumericInput,
  PasswordInput,
} from '@/components'

const LoginForm = (
  props: DataModuleFormProps<LoginResult, LoginFormValues>,
) => {
  const form = useLoginForm(props)

  return (
    <FormLayout
      onSubmit={form.submit}
      footer={
        <FormSubmitBtn control={form.control}>
          <Icon icon={LoginIcon}>Iniciar sesión</Icon>
        </FormSubmitBtn>
      }
      noValidate={false}
    >
      <Form form={form}>
        <FormRow>
          <FormGroup label="Proyecto" name="projectId" input={NumericInput} />
        </FormRow>
        <FormRow>
          <FormGroup label="Usuario" name="username" input={Input} />
        </FormRow>
        <FormRow>
          <FormGroup
            label="Contraseña"
            name="password"
            autoComplete="new-password"
            input={PasswordInput}
          />
        </FormRow>
      </Form>
    </FormLayout>
  )
}

export default LoginForm

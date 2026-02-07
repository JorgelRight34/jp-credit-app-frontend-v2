import { useState } from 'react'
import { useLoginForm } from '../hooks/useLoginForm'
import type { LoginResult } from '../models/loginResult'
import type { LoginSchemaType } from '../lib/schemas/loginSchema'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormSubmitBtn,
  Input,
  LoginIcon,
  PasswordInput,
} from '@/components'

const LoginForm = (
  props: DataModuleFormProps<LoginResult, LoginSchemaType>,
) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useLoginForm({ onDirtyChange: setIsDirty, ...props })

  return (
    <FormContainer
      footer={
        <FormSubmitBtn
          form={form}
          isDirty={isDirty}
          text="Iniciar sesión"
          icon={LoginIcon}
        />
      }
    >
      <Form form={form}>
        <FormGroup label="Usuario" name="username" input={Input} />
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

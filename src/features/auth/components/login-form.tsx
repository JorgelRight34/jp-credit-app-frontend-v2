import { useState } from 'react'
import { useLoginForm } from '../hooks/useLoginForm'
import type { LoginResult } from '../models/loginResult'
import type { LoginSchemaType } from '../lib/schemas/loginSchema'
import type { UseDataModuleFormProps } from '@/components'
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
  props: UseDataModuleFormProps<LoginResult, LoginSchemaType>,
) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useLoginForm({ onDirtyChange: setIsDirty, ...props })

  return (
    <Form form={form}>
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
        <FormGroup label="Usuario" name="username" input={Input} />
        <FormGroup
          label="Contraseña"
          name="password"
          autoComplete="new-password"
          input={PasswordInput}
        />
      </FormContainer>
    </Form>
  )
}

export default LoginForm

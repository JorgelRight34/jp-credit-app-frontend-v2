import { useState } from 'react'
import { useLoginForm } from '../../hooks/useLoginForm'
import {
  Form,
  FormContainer,
  FormGroup,
  FormSubmitBtn,
  Input,
  PasswordInput,
} from '@/components'

const LoginForm = () => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useLoginForm({ onDirtyChange: setIsDirty })

  return (
    <Form form={form}>
      <FormContainer footer={<FormSubmitBtn form={form} isDirty={isDirty} />}>
        <FormGroup label="Usuario" name="username" input={Input} />
        <FormGroup label="Contraseña" name="password" input={PasswordInput} />
      </FormContainer>
    </Form>
  )
}

export default LoginForm

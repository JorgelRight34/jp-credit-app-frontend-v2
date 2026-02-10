import { updateUsernameOnForm } from '../lib/form-utils'
import type { useUserForm } from '../hooks/useUserForm'
import {
  Form,
  FormGroup,
  FormRow,
  FormWatchGroup,
  Input,
  PasswordInput,
} from '@/components'

interface UserDataFormProps {
  edit: boolean
  form: ReturnType<typeof useUserForm>
}

const UserDataForm = ({ edit, form }: UserDataFormProps) => {
  return (
    <Form form={form}>
      <FormRow>
        <FormGroup label="Nombres" name="firstName" input={Input} />
        <FormGroup label="Apellidos" name="lastName" input={Input} />
      </FormRow>
      <FormRow>
        <FormWatchGroup
          watchedValues={['firstName', 'lastName']}
          onWacthedValuesChange={updateUsernameOnForm}
          label="Usuario"
          name="username"
          input={Input}
        />
        <FormGroup label="Email" name="email" type="email" input={Input} />
      </FormRow>
      {!edit && (
        <FormRow>
          <FormGroup
            label="Contraseña"
            autoComplete="new-password"
            name="password"
            input={PasswordInput}
          />
          <FormGroup
            label="Confirmación"
            autoComplete="new-password"
            name="confirmation"
            input={PasswordInput}
          />
        </FormRow>
      )}
    </Form>
  )
}

export default UserDataForm

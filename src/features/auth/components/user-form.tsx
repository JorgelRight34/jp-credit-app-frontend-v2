import { useUserForm } from '../hooks/useUserForm'
import { updateUsernameOnForm } from '../lib/form-utils'
import type { User } from '../models/user'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import type { DataModuleFormProps, FormRef } from '@/components'
import type { Ref } from 'react'
import {
  Form,
  FormGroup,
  FormRow,
  FormWatchGroup,
  Input,
  PasswordInput,
} from '@/components'

export type UserFormProps = DataModuleFormProps<User, UserFormValues> & {
  user?: User
}

const UserForm = ({ ref, ...props }: UserFormProps) => {
  const form = useUserForm(props)

  return (
    <Form ref={ref as Ref<FormRef<UserFormValues>>} form={form}>
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
    </Form>
  )
}

export default UserForm

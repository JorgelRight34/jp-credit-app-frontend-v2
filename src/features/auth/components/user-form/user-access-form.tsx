import { useUserForm } from '../../hooks/useUserForm'
import { updateUsernameOnForm } from '../../lib/form-utils'
import type { Ref } from 'react'
import type { FormRef, UseDataModuleFormProps } from '@/components'
import type { User } from '../../models/user'
import type { UserFormValues } from '../../lib/schemas/userFormSchema'
import {
  Form,
  FormGroup,
  FormRow,
  FormWatchGroup,
  Input,
  PasswordInput,
} from '@/components'

export type UserAccessFormProps = UseDataModuleFormProps<
  User,
  UserFormValues
> & {
  user?: User
}

const UserAccessForm = ({ shouldEdit, ref, ...props }: UserAccessFormProps) => {
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
      {!shouldEdit && (
        <FormRow>
          <FormGroup label="Contraseña" name="password" input={PasswordInput} />
          <FormGroup
            label="Confirmación"
            name="confirmation"
            input={PasswordInput}
          />
        </FormRow>
      )}
    </Form>
  )
}

export default UserAccessForm

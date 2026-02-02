import { useState } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import { updateUsernameOnForm } from '../lib/form-utils'
import type { User } from '../models/user'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import type { UseDataModuleFormProps } from '@/components'
import {
  Form,
  FormContainer,
  FormGroup,
  FormRow,
  FormSubmitBtn,
  FormWatchGroup,
  Input,
} from '@/components'

export type UserFormProps = Omit<
  UseDataModuleFormProps<User, UserFormValues>,
  'shouldEdit'
> & {
  user?: User
}

const UserEditForm = ({ ...props }: UserFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useUserForm({
    shouldEdit: true,
    onDirtyChange: setIsDirty,
    ...props,
  })

  console.log('userEditForm')

  return (
    <FormContainer footer={<FormSubmitBtn isDirty={isDirty} form={form} />}>
      <Form form={form}>
        <FormRow>
          <FormGroup label="Nombres" name="firstName" input={Input} />
        </FormRow>
        <FormRow>
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
        </FormRow>
        <FormGroup label="Email" name="email" type="email" input={Input} />
      </Form>
    </FormContainer>
  )
}

export default UserEditForm

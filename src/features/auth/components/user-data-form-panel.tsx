import { ReactNode } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import {
  Form,
  FormGroup,
  FormRow,
  FormWatchGroup,
  Input,
  WatchedValuesChangeHandler,
} from '@/components'
import { UserFormValues } from '../lib/schemas/userFormSchema'
import { generateUsername } from '../lib/utils'

export const updateUsernameOnForm: WatchedValuesChangeHandler<
  UserFormValues
> = (context) => {
  if (context.state.isDirty === false) return

  const { lastName, firstName } = context.getValues()

  if (lastName && firstName) {
    context.setValue(
      'username',
      generateUsername(firstName.trim(), lastName.trim()),
    )
  }
}

const UserDataFormPanel = ({
  form,
  children,
}: {
  form: ReturnType<typeof useUserForm>
  children?: ReactNode
}) => {
  return (
    <Form form={form}>
      <FormRow>
        <FormGroup label="Nombres" name="firstName" input={Input} />
        <FormGroup label="Apellidos" name="lastName" input={Input} />
      </FormRow>
      <FormRow>
        <FormWatchGroup
          watchedValues={['firstName', 'lastName']}
          onWatchedValuesChange={updateUsernameOnForm}
          label="Usuario"
          name="username"
          input={Input}
        />
        <FormGroup label="Email" name="email" type="email" input={Input} />
      </FormRow>
      {children}
    </Form>
  )
}

export default UserDataFormPanel

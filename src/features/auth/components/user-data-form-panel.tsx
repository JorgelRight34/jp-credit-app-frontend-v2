import { ReactNode } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import { Form, FormGroup, FormRow, FormWatchGroup, Input } from '@/components'
import { updateUsernameOnForm } from '../lib/form-utils'

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
          onWacthedValuesChange={updateUsernameOnForm}
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

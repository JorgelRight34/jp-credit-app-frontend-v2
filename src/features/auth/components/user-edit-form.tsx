import { useState } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { User } from '../models/user'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import type { DataModuleFormProps } from '@/components'
import {
  Form,
  FormCheckboxGroup,
  FormContainer,
  FormGroup,
  FormRow,
  FormSubmitBtn,
  Input,
  ProtectedComponent,
} from '@/components'

export type UserFormProps = Omit<
  DataModuleFormProps<User, UserFormValues>,
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
          <FormGroup label="Usuario" name="username" input={Input} />
        </FormRow>
        <FormRow>
          <FormGroup label="Email" name="email" type="email" input={Input} />
        </FormRow>
        <ProtectedComponent
          provider={accessControlPermissionProvider}
          isAuthorizedFn={(p) => p.canEdit}
        >
          <FormCheckboxGroup label="Habilitado" name="isActive" />
        </ProtectedComponent>
      </Form>
    </FormContainer>
  )
}

export default UserEditForm

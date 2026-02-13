import { Suspense, useRef } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel, {
  UserRolesFormProps,
  UserRolesFormRef,
} from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  FormContainer,
  FormGroup,
  FormRow,
  PasswordInput,
  Tab,
  Tabs,
} from '@/components'
import PermissionsForm, { PermissionsFormRef } from './permissions-form'
import { updateUserClaims } from '../services/userClient'
import UserDataFormPanel from './user-data-form-panel'
import { useUserRolesForm } from '../hooks/useUserRolesForm'

type CreateUserAccessFormProps = DataModuleFormProps<User, UserFormValues>

const CreateUserAccessForm = (props: CreateUserAccessFormProps) => {
  const permissionsFormRef = useRef<PermissionsFormRef>(null)
  const rolesFormRef = useRef<UserRolesFormRef>(null)

  const form = useUserForm({
    onSuccess: async ({ id, username }) => {
      permissionsFormRef.current?.setValue('id', id)

      rolesFormRef.current?.setValue('userId', id)
      rolesFormRef.current?.setValue('username', username)

      await Promise.all([
        permissionsFormRef.current?.submit(),
        rolesFormRef.current?.submit(),
      ])
    },
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Datos">
          <UserDataFormPanel form={form}>
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
          </UserDataFormPanel>
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <PermissionsForm handler={updateUserClaims} />
          </Suspense>
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <Suspense fallback="...">
            <UserRolesForm ref={rolesFormRef} />
          </Suspense>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

const UserRolesForm = ({ ref, ...props }: UserRolesFormProps) => {
  const form = useUserRolesForm(props)

  return (
    <FormContainer form={form}>
      <UserRolesFormPanel form={form} ref={ref} />
    </FormContainer>
  )
}

export default CreateUserAccessForm

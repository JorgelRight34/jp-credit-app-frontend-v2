import { Suspense, useRef, useState } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel, { UserRolesFormRef } from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import { FormContainer, FormContainerButtons, Tab, Tabs } from '@/components'
import PermissionsForm, { PermissionsFormRef } from './permissions-form'
import { updateUserClaims } from '../services/userClient'
import UserDataFormPanel from './user-data-form-panel'

type CreateUserAccessFormProps = DataModuleFormProps<User, UserFormValues>

const CreateUserAccessForm = (props: CreateUserAccessFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
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
    onDirtyChange: setIsDirty,
    ...props,
  })

  return (
    <FormContainer
      footer={<FormContainerButtons form={form} isDirty={isDirty} />}
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Datos">
          <UserDataFormPanel form={form} />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <PermissionsForm handler={updateUserClaims} />
          </Suspense>
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <Suspense fallback="...">
            <UserRolesFormPanel />
          </Suspense>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default CreateUserAccessForm

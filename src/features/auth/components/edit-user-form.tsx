import { Suspense } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import { FormContainer, Tab, Tabs } from '@/components'
import UserDataFormPanel from './user-data-form-panel'
import PermissionsForm from './permissions-form'
import { claimPairToString } from '../lib/utils'
import { updateUserClaims } from '../services/userClient'
import { useUserRolesForm } from '../hooks/useUserRolesForm'

type EditUserFormProps = DataModuleFormProps<User, UserFormValues> & {
  user: User
}

const EditUserAccessForm = ({ user, ...props }: EditUserFormProps) => {
  const form = useUserForm({
    user,
    ...props,
  })

  return (
    <Tabs defaultActiveKey="data" navigate={false}>
      <Tab eventKey="data" title="Datos">
        <FormContainer form={form}>
          <UserDataFormPanel form={form} />
        </FormContainer>
      </Tab>
      <Tab eventKey="permissions" title="Permisos">
        <Suspense fallback="...">
          <PermissionsForm
            handler={updateUserClaims}
            initialValues={{
              claims: user.claims.map(claimPairToString),
              id: user.id,
              roles: [],
            }}
          />
        </Suspense>
      </Tab>
      <Tab eventKey="roles" title="Roles">
        <Suspense fallback={null}>
          <UserRolesForm user={user} />
        </Suspense>
      </Tab>
    </Tabs>
  )
}

const UserRolesForm = ({ user }: EditUserFormProps) => {
  const form = useUserRolesForm({ user })

  return (
    <FormContainer form={form}>
      <UserRolesFormPanel form={form} user={user} />
    </FormContainer>
  )
}

export default EditUserAccessForm

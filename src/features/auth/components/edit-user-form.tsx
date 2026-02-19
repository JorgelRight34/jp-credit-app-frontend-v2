import { Suspense } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import { Form, FormContainer, FormInput, Tab, Tabs } from '@/components'
import UserDataFormPanel from './user-data-form-panel'
import { claimPairToString } from '../lib/utils'
import { updateUserClaims } from '../services/userClient'
import { useUserRolesForm } from '../hooks/useUserRolesForm'
import { usePermissionsForm } from '../hooks/usePermissionsForm'
import PermissionsFormTransferList from './permissions-form-transfer-list'

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
        <PermissionsForm user={user} />
      </Tab>
      <Tab eventKey="roles" title="Roles">
        <UserRolesForm user={user} />
      </Tab>
    </Tabs>
  )
}

const PermissionsForm = ({ user }: { user: User }) => {
  const form = usePermissionsForm({
    handler: updateUserClaims,
    initialValues: {
      claims: user.claims.map(claimPairToString),
      id: user.id,
      roles: [],
    },
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <Suspense fallback="...">
          <FormInput name="claims" as={PermissionsFormTransferList} />
        </Suspense>
      </Form>
    </FormContainer>
  )
}

const UserRolesForm = ({ user }: EditUserFormProps) => {
  const form = useUserRolesForm({ user })

  return (
    <FormContainer form={form}>
      <Suspense fallback={null}>
        <UserRolesFormPanel form={form} user={user} />
      </Suspense>
    </FormContainer>
  )
}

export default EditUserAccessForm

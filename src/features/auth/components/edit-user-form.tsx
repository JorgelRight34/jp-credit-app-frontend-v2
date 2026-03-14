import { Suspense } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  Form,
  FormContainer,
  FormInput,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import UserDataFormPanel from './user-data-form-panel'
import { claimPairToString } from '../lib/utils'
import { updateUserClaims } from '../services/userClient'
import { useUserRolesForm } from '../hooks/useUserRolesForm'
import { usePermissionsForm } from '../hooks/usePermissionsForm'
import PermissionsFormTransferList from './permissions-form-transfer-list'
import ResetPasswordForm from './reset-password-form'

type EditUserFormProps = DataModuleFormProps<User, UserFormValues> & {
  user: User
}

const EditUserAccessForm = ({ user, ...props }: EditUserFormProps) => {
  const form = useUserForm({
    initialValues: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
    },
    shouldEdit: true,
    userId: user.id,
    toastMessage: () => 'Guardado',
    ...props,
  })

  return (
    <Tabs>
      <TabsList>
        <Tab index={0}>Datos</Tab>
        <Tab index={1}>Permisos</Tab>
        <Tab index={2}>Roles</Tab>
        <Tab index={3}>Contraseña</Tab>
      </TabsList>
      <TabPanel index={0}>
        <FormContainer form={form}>
          <UserDataFormPanel form={form} />
        </FormContainer>
      </TabPanel>
      <TabPanel index={1}>
        <PermissionsForm user={user} />
      </TabPanel>
      <TabPanel index={2}>
        <UserRolesForm user={user} />
      </TabPanel>
      <TabPanel index={3}>
        <ResetPasswordForm user={user} />
      </TabPanel>
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

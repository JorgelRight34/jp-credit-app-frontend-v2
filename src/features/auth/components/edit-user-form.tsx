import { Suspense } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import type { PropsWithUser, User } from '../../../models/user'
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
import UserRolesTransferList from './user-roles-transfer-list'
import {
  ProjectUserTransferList,
  useProjectUserForm,
} from '@/features/projects'

type EditUserFormProps = PropsWithUser<
  DataModuleFormProps<User, UserFormValues>
>

const EditUserAccessForm = ({ user, ...props }: EditUserFormProps) => {
  const form = useUserForm({
    defaultValues: {
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
        <Tab index={3}>Proyectos</Tab>
        <Tab index={4}>Contraseña</Tab>
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
        <ProjectUserForm user={user} />
      </TabPanel>
      <TabPanel index={4}>
        <ResetPasswordForm user={user} />
      </TabPanel>
    </Tabs>
  )
}

const PermissionsForm = ({ user }: PropsWithUser) => {
  const form = usePermissionsForm({
    handler: updateUserClaims,
    defaultValues: {
      id: user.id,
      claims: user.claims.map((c) => c.claimValue),
      roles: [],
    },
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <Suspense fallback="...">
          <FormInput
            name="claims"
            className="max-h-96"
            as={PermissionsFormTransferList}
          />
        </Suspense>
      </Form>
    </FormContainer>
  )
}

const UserRolesForm = ({ user }: PropsWithUser) => {
  const form = useUserRolesForm({ user })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <Suspense fallback="...">
          <FormInput
            name="roles"
            className="max-h-96"
            as={UserRolesTransferList}
          />
        </Suspense>
      </Form>
    </FormContainer>
  )
}

const ProjectUserForm = ({ user }: PropsWithUser) => {
  const form = useProjectUserForm({
    defaultValues: {
      userId: user.id,
      projectIds: user.projects.map((p) => p.id),
    },
  })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <Suspense fallback="...">
          <FormInput
            name="projectIds"
            className="max-h-96"
            as={ProjectUserTransferList}
          />
        </Suspense>
      </Form>
    </FormContainer>
  )
}

export default EditUserAccessForm

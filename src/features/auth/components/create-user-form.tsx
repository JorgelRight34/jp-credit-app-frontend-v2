import { Suspense, useRef } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import type { User } from '../../../models/user'
import type { DataModuleFormProps, PropsWithFormRef } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormRow,
  FormWithRef,
  PasswordInput,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { updateUserClaims } from '../services/userClient'
import UserDataFormPanel from './user-data-form-panel'
import {
  UserRolesFormProps,
  UserRolesFormRef,
  useUserRolesForm,
} from '../hooks/useUserRolesForm'
import {
  PermissionsFormRef,
  usePermissionsForm,
} from '../hooks/usePermissionsForm'
import PermissionsFormTransferList from './permissions-form-transfer-list'
import UserRolesTransferList from './user-roles-transfer-list'
import {
  ProjectUserFormRef,
  ProjectUserTransferList,
  useProjectUserForm,
} from '@/features/projects'

type CreateUserAccessFormProps = DataModuleFormProps<User, UserFormValues>

const defaultValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmation: '',
  isActive: true,
}

const CreateUserAccessForm = (props: CreateUserAccessFormProps) => {
  const permissionsFormRef = useRef<PermissionsFormRef>(null)
  const rolesFormRef = useRef<UserRolesFormRef>(null)
  const projectUserFormRef = useRef<ProjectUserFormRef>(null)

  const form = useUserForm({
    defaultValues,
    onSuccess: async ({ id, username }) => {
      permissionsFormRef.current?.setValue('id', id)
      projectUserFormRef.current?.setValue('userId', id)
      rolesFormRef.current?.setValue('userId', id)
      rolesFormRef.current?.setValue('username', username)

      await Promise.all([
        permissionsFormRef.current?.submit(),
        rolesFormRef.current?.submit(),
        projectUserFormRef.current?.submit(),
      ])
    },
    toastMessage: () => 'Guardado',
    ...props,
  })

  return (
    <FormContainer form={form}>
      <Tabs>
        <TabsList>
          <Tab index={0}>Datos</Tab>
          <Tab index={1}>Permisos</Tab>
          <Tab index={2}>Roles</Tab>
          <Tab index={3}>Proyectos</Tab>
        </TabsList>
        <TabPanel index={0}>
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
        </TabPanel>
        <TabPanel index={1}>
          <PermissionsForm ref={permissionsFormRef} />
        </TabPanel>
        <TabPanel index={2}>
          <UserRolesForm ref={rolesFormRef} />
        </TabPanel>
        <TabPanel index={3}>
          <ProjectUserForm ref={projectUserFormRef} />
        </TabPanel>
      </Tabs>
    </FormContainer>
  )
}

const PermissionsForm = ({ ref }: PropsWithFormRef<PermissionsFormRef>) => {
  const form = usePermissionsForm({ handler: updateUserClaims })

  return (
    <FormWithRef ref={ref} form={form}>
      <Suspense fallback="...">
        <FormInput
          name="claims"
          className="!max-h-fit"
          as={PermissionsFormTransferList}
        />
      </Suspense>
    </FormWithRef>
  )
}

const UserRolesForm = ({ ref, ...props }: UserRolesFormProps) => {
  const form = useUserRolesForm(props)

  return (
    <FormWithRef ref={ref} form={form}>
      <Suspense fallback="...">
        <FormInput
          name="roles"
          className="max-h-96"
          as={UserRolesTransferList}
        />
      </Suspense>
    </FormWithRef>
  )
}

const ProjectUserForm = ({ ref }: PropsWithFormRef<ProjectUserFormRef>) => {
  const form = useProjectUserForm()

  return (
    <FormWithRef ref={ref} form={form}>
      <Suspense fallback="...">
        <FormInput
          name="projectIds"
          className="max-h-96"
          as={ProjectUserTransferList}
        />
      </Suspense>
    </FormWithRef>
  )
}

export default CreateUserAccessForm

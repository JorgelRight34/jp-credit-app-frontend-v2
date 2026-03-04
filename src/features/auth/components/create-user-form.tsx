import { Ref, Suspense, useRef } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel, {
  UserRolesFormProps,
  UserRolesFormRef,
} from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  Form,
  FormContainer,
  FormGroup,
  FormInput,
  FormRow,
  PasswordInput,
  Tab,
  Tabs,
} from '@/components'
import { updateUserClaims } from '../services/userClient'
import UserDataFormPanel from './user-data-form-panel'
import { useUserRolesForm } from '../hooks/useUserRolesForm'
import {
  PermissionsFormRef,
  usePermissionsForm,
} from '../hooks/usePermissionsForm'
import PermissionsFormTransferList from './permissions-form-transfer-list'

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
    toastMessage: () => 'Guardado',
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmation: '',
      isActive: true,
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
          <PermissionsForm ref={permissionsFormRef} />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <UserRolesForm ref={rolesFormRef} />
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

const PermissionsForm = ({ ref }: { ref: Ref<PermissionsFormRef> }) => {
  const form = usePermissionsForm({ handler: updateUserClaims })

  return (
    <Form ref={ref} form={form}>
      <Suspense fallback="...">
        <FormInput name="claims" as={PermissionsFormTransferList} />
      </Suspense>
    </Form>
  )
}

const UserRolesForm = ({ ref, ...props }: UserRolesFormProps) => {
  const form = useUserRolesForm(props)

  return (
    <Suspense fallback="...">
      <UserRolesFormPanel form={form} ref={ref} />
    </Suspense>
  )
}

export default CreateUserAccessForm

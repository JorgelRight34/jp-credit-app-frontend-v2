import { Suspense, useMemo, useRef, useState } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel, { UserRolesFormRef } from './user-roles-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  FormContainer,
  FormContainerButtons,
  FormGroup,
  FormRow,
  PasswordInput,
  Tab,
  Tabs,
} from '@/components'
import UserDataFormPanel from './user-data-form-panel'
import PermissionsForm, {
  PermissionsFormProps,
  PermissionsFormRef,
} from './permissions-form'
import { claimPairToString } from '../lib/utils'
import { updateUserClaims } from '../services/userClient'

type EditUserFormProps = DataModuleFormProps<User, UserFormValues> & {
  user: User
}

const EditUserAccessForm = ({ user, ...props }: EditUserFormProps) => {
  return (
    <Tabs defaultActiveKey="data" navigate={false}>
      <Tab eventKey="data" title="Datos">
        <UserDataForm user={user} {...props} />
      </Tab>
      <Tab eventKey="permissions" title="Permisos">
        <UserPermissionsForm user={user} />
      </Tab>
      <Tab eventKey="roles" title="Roles">
        <UserRolesForm user={user} />
      </Tab>
    </Tabs>
  )
}

const UserDataForm = ({ user, ...props }: EditUserFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const form = useUserForm({
    user,
    onDirtyChange: setIsDirty,
    ...props,
  })

  return (
    <FormContainer
      footer={<FormContainerButtons isDirty={isDirty} form={form} />}
    >
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
    </FormContainer>
  )
}

const UserPermissionsForm = ({
  user,
  ...props
}: Partial<PermissionsFormProps> & {
  user: User
}) => {
  const [isDirty, setIsDirty] = useState(false)
  const permissionsFormRef = useRef<PermissionsFormRef>(null)

  const permissionsFormInitialValues = useMemo<
    PermissionsFormProps['initialValues']
  >(
    () => ({
      claims: user.claims.map(claimPairToString),
      id: user.id,
      roles: [],
    }),
    [user],
  )

  return (
    <FormContainer
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onSubmit={() => permissionsFormRef.current?.submit()}
        />
      }
    >
      <Suspense fallback="...">
        <PermissionsForm
          handler={updateUserClaims}
          initialValues={permissionsFormInitialValues}
          onDirtyChange={setIsDirty}
          {...props}
        />
      </Suspense>
    </FormContainer>
  )
}

const UserRolesForm = ({ user }: EditUserFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const rolesFormRef = useRef<UserRolesFormRef>(null)

  return (
    <FormContainer
      footer={
        <FormContainerButtons
          isDirty={isDirty}
          onSubmit={() => rolesFormRef.current?.submit()}
        />
      }
    >
      <Suspense fallback={null}>
        <UserRolesFormPanel user={user} onDirtyChange={setIsDirty} />
      </Suspense>
    </FormContainer>
  )
}

export default EditUserAccessForm

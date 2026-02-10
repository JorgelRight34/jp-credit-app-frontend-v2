import { Suspense } from 'react'
import { useUserForm } from '../hooks/useUserForm'
import UserRolesFormPanel from './user-roles-form-panel'
import UserDataFormPanel from './user-data-form-panel'
import UserPermissionsFormPanel from './user-permissions-form-panel'
import type { User } from '../models/user'
import type { DataModuleFormProps } from '@/components'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import {
  FormContainer,
  FormContainerButtons,
  Tab,
  Tabs,
  useMultipleForms,
} from '@/components'

type UserAccessFormProps = DataModuleFormProps<User, UserFormValues> & {
  user?: User
}

const UserAccessForm = ({ user, ...props }: UserAccessFormProps) => {
  const { forms, setFormRef, handleSubmit, isDirty, onDirtyChange } =
    useMultipleForms(['data', 'permissions', 'roles'])

  const form = useUserForm({
    ...props,
    user,
    onSuccess: async (data) => {
      forms.permissions?.setValue('id', data.id)
      forms.permissions?.submit()

      forms.roles?.setValue('username', data.username)
      forms.roles?.setValue('userId', data.id)

      await Promise.all([forms.permissions?.submit(), forms.roles?.submit()])
    },
    onDirtyChange,
  })

  return (
    <FormContainer
      footer={
        <FormContainerButtons isDirty={isDirty} onSubmit={handleSubmit} />
      }
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Datos">
          <UserDataFormPanel edit={!!user} form={form} />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <UserPermissionsFormPanel
            user={user}
            toastMessage={() => 'Permisos actualizados!'}
          />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <Suspense fallback="...">
            <UserRolesFormPanel
              user={user}
              ref={setFormRef('roles')}
              toastMessage={() => 'Roles actualizados!'}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default UserAccessForm

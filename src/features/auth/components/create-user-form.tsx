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
  const { forms, isDirty, setFormRef, handleSubmit, onDirtyChange, reset } =
    useMultipleForms(['data', 'permissions', 'roles'])

  const form = useUserForm({
    user,
    onSuccess: async ({ id, username }) => {
      const { permissions, roles } = forms;

      permissions?.setValue('id', id)

      roles?.setValue('userId', id)
      roles?.setValue('username', username)

      await Promise.all([permissions?.submit(), roles?.submit()])
    },
    onDirtyChange,
    ...props,
  })

  return (
    <FormContainer
      footer={
        <FormContainerButtons 
          form={form}
          toastMessage='Exito'
          shouldSubmitAll={!!user} 
          isDirty={isDirty} 
          onSubmitAll={handleSubmit} 
          onReset={reset} />
      }
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Datos">
          <UserDataFormPanel edit={!!user} form={form} />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <UserPermissionsFormPanel 
            user={user} 
            ref={setFormRef('permissions')}               
            onDirtyChange={onDirtyChange}
          />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <Suspense fallback="...">
            <UserRolesFormPanel
              user={user}
              ref={setFormRef('roles')}
              onDirtyChange={onDirtyChange}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </FormContainer>
  )
}

export default UserAccessForm

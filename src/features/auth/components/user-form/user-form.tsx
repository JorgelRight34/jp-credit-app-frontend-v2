import { Suspense, useState } from 'react'
import ChangePasswordForm from '../change-password/change-password-form'
import UserAccessForm from './user-access-form'
import UserFormPermissions from './user-form-permissions'
import type { UserAccessFormProps } from './user-access-form'
import type { UserPermissions } from '../../models/userPermissions'
import {
  FormContainer,
  FormSubmitBtn,
  Tab,
  Tabs,
  useMultipleForms,
} from '@/components'

type UserFormProps = UserAccessFormProps & {
  initialPermissions?: UserPermissions
}

const UserForm = ({
  user,
  shouldEdit,
  initialPermissions,
  ...props
}: UserFormProps) => {
  const [isDirty, setIsDirty] = useState(false)
  const { forms, setFormRef, handleSubmit } = useMultipleForms([
    'user',
    'permissions',
    'password',
  ])

  return (
    <FormContainer
      footer={<FormSubmitBtn isDirty={isDirty} onSubmit={handleSubmit} />}
    >
      <Tabs defaultActiveKey="data" navigate={false}>
        <Tab eventKey="data" title="Overview">
          <UserAccessForm
            ref={setFormRef('user')}
            onSuccess={(data) => {
              forms['permissions']?.setValue('username', data.username)
              forms['permissions']?.submit()
            }}
            onDirtyChange={setIsDirty}
            user={user}
            shouldEdit={shouldEdit}
            {...props}
          />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <UserFormPermissions
              ref={setFormRef('permissions')}
              username={user?.username}
              initialPermissions={initialPermissions}
              onDirtyChange={setIsDirty}
            />
          </Suspense>
        </Tab>
        {shouldEdit && (
          <Tab eventKey="credentials" title="Credenciales">
            <ChangePasswordForm
              ref={setFormRef('password')}
              initialValues={{ username: user?.username }}
              onDirtyChange={setIsDirty}
            />
          </Tab>
        )}
      </Tabs>
    </FormContainer>
  )
}

export default UserForm

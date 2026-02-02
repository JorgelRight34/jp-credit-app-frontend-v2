import { Suspense } from 'react'
import ChangePasswordForm from './change-password-form'
import UserFormPermissions from './user-form-permissions'
import UserEditForm from './user-edit-form'
import type { UserFormProps } from './user-form'
import type { UserPermissions } from '../models/userPermissions'
import type { User } from '../models/user'
import { Tab, Tabs } from '@/components'

type UserDetailsProps = UserFormProps & {
  user: User
  userPermissions: UserPermissions
}

const UserDetails = ({ user, userPermissions, ...props }: UserDetailsProps) => {
  return (
    <Tabs defaultActiveKey="data" navigate={false}>
      <Tab eventKey="data" title="Overview">
        <div className="flex h-full">
          <div className="flex w-5/12"></div>
          <div className="flex bg-white w-7/12">
            <UserEditForm user={user} {...props} />
          </div>
        </div>
      </Tab>
      <Tab eventKey="permissions" title="Permisos">
        <Suspense fallback="...">
          <UserFormPermissions
            userId={user.id}
            userPermissions={userPermissions}
          />
        </Suspense>
      </Tab>
      <Tab eventKey="credentials" title="Credenciales">
        <ChangePasswordForm initialValues={{ id: user.id }} />
      </Tab>
    </Tabs>
  )
}

export default UserDetails

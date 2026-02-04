import { Suspense } from 'react'
import UserEditForm from './user-edit-form'
import UserEditFormPermissions from './user-edit-form-permissions'
import UserRolesForm from './user-roles-form'
import type { UserFormValues } from '../lib/schemas/userFormSchema'
import type { User } from '../models/user'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { DataModuleFormProps } from '@/components'
import { AccessTimeIcon, Icon, Tab, Tabs } from '@/components'
import { getDateLabelSinceDate } from '@/lib/utils'

type UserDetailsProps = DataModuleFormProps<User, UserFormValues> & {
  user: User
  userPermissions: IdentityPermissions
}

const UserDetails = ({ user, userPermissions, ...props }: UserDetailsProps) => {
  return (
    <Tabs defaultActiveKey="data" navigate={false}>
      <Tab eventKey="data" title="Overview">
        <div className="h-full pb-3">
          <div className="flex justify-end">
            <Icon icon={AccessTimeIcon}>
              Ultimo acceso: {getDateLabelSinceDate(user.lastLogin)}
            </Icon>
          </div>
          <UserEditForm user={user} {...props} />
        </div>
      </Tab>
      <Tab eventKey="permissions" title="Permisos">
        <Suspense fallback="...">
          <UserEditFormPermissions
            userId={user.id}
            claims={userPermissions.claims}
          />
        </Suspense>
      </Tab>
      <Tab eventKey="roles" title="Roles">
        <UserRolesForm user={user} userRoles={userPermissions.roles} />
      </Tab>
    </Tabs>
  )
}

export default UserDetails

import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import UserDetails from '../components/user-details'
import { accessControlBreadcrumb } from '../lib/breadcrumbs'
import type { User } from '../models/user'
import type { UserPermissions } from '../models/userPermissions'
import { getFullName } from '@/lib/utils'
import { EntityLayout, PersonIcon } from '@/components'

type UserPageProps = {
  user: User
  userPermissions: UserPermissions
}

const UserPage = ({ user, userPermissions }: UserPageProps) => {
  return (
    <EntityLayout
      title={`${getFullName(user)} - ${user.username}`}
      permissionProvider={accessControlPermissionProvider}
      breadcrumbs={[
        accessControlBreadcrumb,
        { icon: PersonIcon, title: user.username, pathname: '.' },
      ]}
    >
      <UserDetails
        shouldEdit={true}
        user={user}
        userPermissions={userPermissions}
      />
    </EntityLayout>
  )
}

export default UserPage

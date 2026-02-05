import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import UserDetails from '../components/user-details'
import {
  accessControlBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import type { User } from '../models/user'
import type { IdentityPermissions } from '../models/identityPermissions'
import { getFullName } from '@/lib/utils'
import { PageLayout, PageLayoutBreadcrumb, PersonIcon } from '@/components'

type UserPageProps = {
  user: User
  userPermissions: IdentityPermissions
}

const UserPage = ({ user, userPermissions }: UserPageProps) => {
  return (
    <PageLayout
      title={`${getFullName(user)} - ${user.username}`}
      permissionProvider={accessControlPermissionProvider}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            accessControlBreadcrumb,
            usersModuleBreadcrumb,
            {
              icon: PersonIcon,
              title: user.username,
              pathname: '.',
            },
          ]}
        />
      }
    >
      <UserDetails
        shouldEdit={true}
        user={user}
        userPermissions={userPermissions}
      />
    </PageLayout>
  )
}

export default UserPage

import { Suspense } from 'react'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import {
  accessControlBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import UserEditForm from '../components/user-edit-form'
import UserEditFormPermissions from '../components/user-edit-form-permissions'
import UserRolesForm from '../components/user-roles-form'
import type { User } from '../models/user'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { RouteBreadcrumbMap } from '@/components'
import { getDateLabelSinceDate, getFullName } from '@/lib/utils'
import {
  AccessTimeIcon,
  GroupsIcon,
  Icon,
  OverviewIcon,
  PageRouterLayout,
  PermissionIcon,
  PersonIcon,
  Tab,
  TabsRouter,
} from '@/components'

type UserPageProps = {
  user: User
  userPermissions: IdentityPermissions
}

const tabBreadcrumbMap: RouteBreadcrumbMap = {
  overview: { title: 'Overview', icon: OverviewIcon },
  permissions: { title: 'Permisos', icon: PermissionIcon },
  roles: { title: 'Roles', icon: GroupsIcon },
}

const UserPage = ({ user, userPermissions }: UserPageProps) => {
  return (
    <PageRouterLayout
      title={`${getFullName(user)} - ${user.username}`}
      permissionProvider={accessControlPermissionProvider}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          usersModuleBreadcrumb,
          {
            icon: PersonIcon,
            title: user.username,
          },
        ],
        tabBreadcrumbMap,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <div className="h-full pb-3">
            <div className="flex justify-end">
              <Icon icon={AccessTimeIcon}>
                Ultimo acceso: {getDateLabelSinceDate(user.lastLogin)}
              </Icon>
            </div>
            <UserEditForm user={user} />
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
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default UserPage

import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import {
  accessControlBreadcrumb,
  createUserBreadcrumb,
  usersModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import UserOverview from '../components/user-overview'
import { userRolesTableColumns } from '../lib/config/roles-datatable-config'
import { claimsTableColumns } from '../lib/constants'
import type { User } from '../models/user'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { BreadcrumbsByRoute } from '@/components'
import { getFullName } from '@/lib/utils'
import {
  GroupsIcon,
  OverviewIcon,
  PageRouterLayout,
  PermissionIcon,
  Tab,
  TableBuilder,
  TabsRouter,
  getPageLayoutOptions,
} from '@/components'

type UserPageProps = {
  user: User
  userPermissions: IdentityPermissions
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: { title: 'Overview', icon: OverviewIcon },
  permissions: { title: 'Permisos', icon: PermissionIcon },
  roles: { title: 'Roles', icon: GroupsIcon },
}

const UserPage = ({ user, userPermissions }: UserPageProps) => {
  return (
    <PageRouterLayout
      title={`${getFullName(user)} - ${user.username}`}
      permissionProvider={accessControlPermissionProvider}
      options={getPageLayoutOptions({
        editPath: '/access-control/users/$username/edit',
        params: { username: user.username },
      })}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          usersModuleBreadcrumb,
        ].concat(createUserBreadcrumb(user)),
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <UserOverview user={user} />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <section>
            <TableBuilder
              columns={claimsTableColumns}
              data={userPermissions.claims}
            />
          </section>
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <section>
            <TableBuilder
              columns={userRolesTableColumns}
              data={userPermissions.roles}
            />
          </section>
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default UserPage

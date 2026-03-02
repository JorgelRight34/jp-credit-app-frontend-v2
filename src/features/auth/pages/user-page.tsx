import {
  accessControlBreadcrumb,
  buildUserBreadcrumb,
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
  buildPageLayoutEditOption,
  GroupsIcon,
  PageRouterLayout,
  PermissionIcon,
  Tab,
  TableBuilder,
  TabsRouter,
} from '@/components'
import { overviewBreadcrumb } from '@/lib/constants'

type UserPageProps = {
  user: User
  userPermissions: IdentityPermissions
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  permissions: [{ title: 'Permisos', icon: PermissionIcon }],
  roles: [{ title: 'Roles', icon: GroupsIcon }],
}

const UserPage = ({ user, userPermissions }: UserPageProps) => {
  return (
    <PageRouterLayout
      title={`${getFullName(user)} - ${user.username}`}
      options={[
        buildPageLayoutEditOption('/access-control/users/$username/edit', {
          username: user.username,
        }),
      ]}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          usersModuleBreadcrumb,
        ].concat(buildUserBreadcrumb(user)),
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
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

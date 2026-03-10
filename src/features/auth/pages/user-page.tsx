import UserOverview from '../components/user-overview'
import { userRolesTableColumns } from '../lib/config/roles-datatable-config'
import { claimsTableColumns } from '../lib/constants'
import type { User } from '../models/user'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import { getFullName } from '@/lib/utils'
import {
  buildPageLayoutEditOption,
  GroupsIcon,
  PageRouterLayout,
  PermissionIcon,
  PersonIcon,
  Tab,
  TableBuilder,
  TabsRouter,
} from '@/components'
import { overviewBreadcrumb } from '@/lib/constants'
import { accessControlBreadcrumb } from './access-control-page'

export const buildUserBreadcrumb = (user: User): BreadcrumbSpec => ({
  icon: PersonIcon,
  title: user.username,
  pathname: '/access-control/users/$username',
  params: { username: user.username },
})

export const usersModuleBreadcrumb: BreadcrumbSpec = {
  icon: PersonIcon,
  title: 'Usuarios',
  pathname: '/access-control',
  search: { tab: 'users' },
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  permissions: [{ title: 'Permisos', icon: PermissionIcon }],
  roles: [{ title: 'Roles', icon: GroupsIcon }],
}

const UserPage = ({
  user,
  userPermissions,
}: {
  user: User
  userPermissions: IdentityPermissions
}) => {
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
          buildUserBreadcrumb(user),
        ],
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

import { Suspense } from 'react'
import {
  accessControlBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import RoleForm from '../components/role-form'
import RoleEditFormPermissions from '../components/role-edit-form-permissions'
import UsersDataTable from '../components/users-datatable'
import type { Role } from '../models/role'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { RouteBreadcrumbMap } from '@/components'
import {
  BadgeIcon,
  GroupIcon,
  OverviewIcon,
  PageRouterLayout,
  PermissionIcon,
  Tab,
  TabsRouter,
} from '@/components'

type RolePageProps = {
  role: Role
  rolePermissions: IdentityPermissions
}

const tabBreadcrumbMap: RouteBreadcrumbMap = {
  overview: { title: 'Overview', icon: OverviewIcon },
  permissions: { title: 'Permisos', icon: PermissionIcon },
  participants: { title: 'Participantes', icon: GroupIcon },
}

const RolePage = ({ role, rolePermissions }: RolePageProps) => {
  return (
    <PageRouterLayout
      title={`${role.id} - ${role.name}`}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          rolesModuleBreadcrumb,
          {
            title: role.name,
            icon: BadgeIcon,
          },
        ],
        tabBreadcrumbMap,
      }}
      permissionProvider={rolesPermissionProvider}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <RoleForm role={role} />
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <RoleEditFormPermissions
              roleId={role.id}
              rolePermissions={rolePermissions}
            />
          </Suspense>
        </Tab>
        <Tab eventKey="participants" title="Participantes">
          <UsersDataTable initialQuery={{ role: role.normalizedName }} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default RolePage

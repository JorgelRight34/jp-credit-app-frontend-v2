import { Suspense } from 'react'
import {
  accessControlBreadcrumb,
  createRoleBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import RolePermissionsPanel from '../components/role-permissions-panel'
import UsersDataTable from '../components/users-datatable'
import type { Role } from '../models/role'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { BreadcrumbsByRoute } from '@/components'
import {
  FormReadOnlyGroup,
  FormRow,
  GroupIcon,
  OverviewIcon,
  PageRouterLayout,
  PermissionIcon,
  Tab,
  TabsRouter,
  getPageLayoutOptions,
} from '@/components'

type RolePageProps = {
  role: Role
  rolePermissions: IdentityPermissions
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: { title: 'Overview', icon: OverviewIcon },
  permissions: { title: 'Permisos', icon: PermissionIcon },
  participants: { title: 'Participantes', icon: GroupIcon },
}

const RolePage = ({ role, rolePermissions }: RolePageProps) => {
  return (
    <PageRouterLayout
      title={`${role.id} - ${role.name}`}
      options={getPageLayoutOptions({
        editPath: '/access-control/roles/$id/edit',
        params: { id: role.id.toString() },
      })}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          rolesModuleBreadcrumb,
          createRoleBreadcrumb(role),
        ],
        breadcrumbsByRoute,
      }}
      permissionProvider={rolesPermissionProvider}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Overview">
          <FormRow>
            <FormReadOnlyGroup name="name" label="Nombre" value={role.name} />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              name="normalizedName"
              label="Nombre normalizado"
              value={role.normalizedName}
            />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup
              name="participants"
              label="Número de usuarios"
              value={role.usersCount}
            />
          </FormRow>
          <FormRow>
            <FormReadOnlyGroup name="id" label="Id" value={role.id} />
          </FormRow>
        </Tab>
        <Tab eventKey="permissions" title="Permisos">
          <Suspense fallback="...">
            <RolePermissionsPanel
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

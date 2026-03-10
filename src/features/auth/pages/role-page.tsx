import { Suspense } from 'react'
import UsersDataTable from '../components/users-datatable'
import type { Role } from '../models/role'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import {
  AdminPanelSettingsIcon,
  BadgeIcon,
  buildPageLayoutEditOption,
  FormReadOnlyGroup,
  FormRow,
  GroupIcon,
  PageRouterLayout,
  PermissionIcon,
  Tab,
  TableBuilder,
  TabsRouter,
} from '@/components'
import { claimsTableColumns } from '../lib/constants'
import { overviewBreadcrumb } from '@/lib/constants'
import { accessControlBreadcrumb } from './access-control-page'

export const buildRoleBreadcrumb = (role: Role): BreadcrumbSpec => ({
  title: role.name,
  icon: BadgeIcon,
  pathname: '/access-control/roles/$id',
  params: { id: role.id.toString() },
})

export const rolesModuleBreadcrumb: BreadcrumbSpec = {
  icon: AdminPanelSettingsIcon,
  title: 'Roles',
  pathname: '/access-control',
  search: { tab: 'roles' },
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  permissions: [{ title: 'Permisos', icon: PermissionIcon }],
  participants: [{ title: 'Participantes', icon: GroupIcon }],
}

const RolePage = ({
  role,
  rolePermissions,
}: {
  role: Role
  rolePermissions: IdentityPermissions
}) => {
  return (
    <PageRouterLayout
      title={`${role.id} - ${role.name}`}
      options={[
        buildPageLayoutEditOption('/access-control/roles/$id/edit', {
          id: role.id.toString(),
        }),
      ]}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          rolesModuleBreadcrumb,
          buildRoleBreadcrumb(role),
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
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
            <section>
              <TableBuilder
                columns={claimsTableColumns}
                data={rolePermissions.claims}
              />
            </section>
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

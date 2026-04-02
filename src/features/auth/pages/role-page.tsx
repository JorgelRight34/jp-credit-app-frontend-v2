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
  LayoutRow,
  GroupIcon,
  PageRouterLayout,
  PermissionIcon,
  Tab,
  TableBuilder,
  TabPanel,
  TabsList,
  TabsRouter,
  OverviewLayout,
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

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [overviewBreadcrumb],
  [{ title: 'Permisos', icon: PermissionIcon }],
  [{ title: 'Participantes', icon: GroupIcon }],
]

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
        baseBreadcrumbs: [
          accessControlBreadcrumb,
          rolesModuleBreadcrumb,
          buildRoleBreadcrumb(role),
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
        </TabsList>
        <TabPanel index={0}>
          <OverviewLayout>
            <LayoutRow>
              <FormReadOnlyGroup name="name" label="Nombre" value={role.name} />
            </LayoutRow>
            <LayoutRow>
              <FormReadOnlyGroup
                name="normalizedName"
                label="Nombre normalizado"
                value={role.normalizedName}
              />
            </LayoutRow>
            <LayoutRow>
              <FormReadOnlyGroup
                name="participants"
                label="Número de usuarios"
                value={role.usersCount}
              />
            </LayoutRow>
            <LayoutRow>
              <FormReadOnlyGroup name="id" label="Id" value={role.id} />
            </LayoutRow>
          </OverviewLayout>
        </TabPanel>
        <TabPanel index={1}>
          <Suspense fallback="...">
            <section>
              <TableBuilder
                columns={claimsTableColumns}
                data={rolePermissions.claims}
              />
            </section>
          </Suspense>
        </TabPanel>
        <TabPanel index={2}>
          <UsersDataTable initialQuery={{ role: role.normalizedName }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default RolePage

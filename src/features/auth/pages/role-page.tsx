import { Suspense } from 'react'
import {
  accessControlBreadcrumb,
  buildRoleBreadcrumb,
  rolesModuleBreadcrumb,
} from '../lib/config/breadcrumbs'
import { rolesPermissionProvider } from '../lib/config/permissionProvider'
import UsersDataTable from '../components/users-datatable'
import type { Role } from '../models/role'
import type { IdentityPermissions } from '../models/identityPermissions'
import type { BreadcrumbsByRoute } from '@/components'
import {
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

type RolePageProps = {
  role: Role
  rolePermissions: IdentityPermissions
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  permissions: [{ title: 'Permisos', icon: PermissionIcon }],
  participants: [{ title: 'Participantes', icon: GroupIcon }],
}

const RolePage = ({ role, rolePermissions }: RolePageProps) => {
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
      permissionProvider={rolesPermissionProvider}
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

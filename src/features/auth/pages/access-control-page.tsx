import RolesDataTable from '../components/roles-datatable'
import UsersDataTable from '../components/users-datatable'
import { accessControlBreadcrumb } from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { BreadcrumbsByRoute } from '@/components'
import {
  AddIcon,
  AdminPanelSettingsIcon,
  createPageLayoutCreateOption,
  LightPillBtn,
  PageRouterLayout,
  PersonIcon,
  Tab,
  TabsRouter,
} from '@/components'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  users: {
    icon: () => <PersonIcon />,
    title: 'Usuarios',
    pathname: '.',
  },
  roles: {
    icon: () => <AdminPanelSettingsIcon />,
    title: 'Roles',
    pathname: '.',
  },
}

const AccessControlPage = () => {
  return (
    <PageRouterLayout
      title="Accesos"
      options={[
        {
          title: 'Roles',
          icon: AddIcon,
          to: '/access-control/roles/create',
          component: LightPillBtn,
        },
        createPageLayoutCreateOption('/access-control/users/create'),
      ]}
      permissionProvider={accessControlPermissionProvider}
      routerConfig={{
        defaultActive: 'users',
        breadcrumbsByRoute,
        baseBreadcrumbs: [accessControlBreadcrumb],
      }}
    >
      <TabsRouter>
        <Tab eventKey="users" title="Usuarios">
          <UsersDataTable />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          <RolesDataTable />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AccessControlPage

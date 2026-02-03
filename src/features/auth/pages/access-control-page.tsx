import RolesDataTable from '../components/roles-datatable'
import UsersDataTable from '../components/users-datatable'
import { accessControlBreadcrumb } from '../lib/config/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import type { RouteBreadcrumbMap } from '@/components'
import {
  AddIcon,
  AdminPanelSettingsIcon,
  EntityLayout,
  LightPillBtn,
  PersonIcon,
  Tab,
  TabsRouter,
  TabsRouterBreadcrumb,
  TabsRouterProvider,
  getEntityLayoutOptions,
} from '@/components'

const tabBreadcrumbMap: RouteBreadcrumbMap = {
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
    <TabsRouterProvider defaultActive="users">
      <EntityLayout
        title="Accesos"
        breadcrumb={
          <TabsRouterBreadcrumb
            tabBreadcrumbMap={tabBreadcrumbMap}
            baseBreadcrumbs={[accessControlBreadcrumb]}
          />
        }
        options={[
          {
            title: 'Roles',
            icon: AddIcon,
            to: '/access-control/roles/create',
            component: LightPillBtn,
          },
          ...getEntityLayoutOptions({
            createPath: '/access-control/users/create',
          }),
        ]}
        permissionProvider={accessControlPermissionProvider}
      >
        <TabsRouter>
          <Tab eventKey="users" title="Usuarios">
            <UsersDataTable />
          </Tab>
          <Tab eventKey="roles" title="Roles">
            <RolesDataTable />
          </Tab>
        </TabsRouter>
      </EntityLayout>
    </TabsRouterProvider>
  )
}

export default AccessControlPage

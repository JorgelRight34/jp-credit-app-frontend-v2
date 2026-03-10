import RolesDataTable from '../components/roles-datatable'
import UsersDataTable from '../components/users-datatable'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import {
  AddIcon,
  AdminPanelSettingsIcon,
  buildPageLayoutCreateOption,
  LightPillBtn,
  LockIcon,
  PageRouterLayout,
  PersonIcon,
  Tab,
  TabsRouter,
} from '@/components'

export const accessControlBreadcrumb: BreadcrumbSpec = {
  icon: LockIcon,
  title: 'Accesos',
  pathname: '/access-control',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  users: [{ icon: PersonIcon, title: 'Usuarios' }],
  roles: [{ icon: AdminPanelSettingsIcon, title: 'Roles' }],
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
        buildPageLayoutCreateOption('/access-control/users/create'),
      ]}
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

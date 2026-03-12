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
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'

export const accessControlBreadcrumb: BreadcrumbSpec = {
  icon: LockIcon,
  title: 'Accesos',
  pathname: '/access-control',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ icon: PersonIcon, title: 'Usuarios' }],
  [{ icon: AdminPanelSettingsIcon, title: 'Roles' }],
]

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
        breadcrumbsByRoute,
        baseBreadcrumbs: [accessControlBreadcrumb],
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0} eventKey="users">
            Usuarios
          </Tab>
          <Tab index={1} eventKey="roles">
            Roles
          </Tab>
        </TabsList>
        <TabPanel index={0}>
          <UsersDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <RolesDataTable />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default AccessControlPage

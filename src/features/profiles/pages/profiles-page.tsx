import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import ProfilesDataTable from '../components/profiles-datatable'
import type { BreadcrumbsByRoute } from '@/components'
import {
  AllIcon,
  buildPageLayoutCreateOption,
  GroupIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: () => <AllIcon /> }],
  clients: [{ title: 'Clientes', icon: () => <GroupIcon /> }],
  guarantors: [{ title: 'Garantes', icon: () => <GroupIcon /> }],
  'loan-officers': [
    {
      title: 'Agentes',
      icon: () => <GroupIcon />,
    },
  ],
}

const ProfilesPage = () => {
  return (
    <PageRouterLayout
      title="Pérfiles"
      permissionProvider={profilesPermissionProvider}
      options={[buildPageLayoutCreateOption('/profiles/create')]}
      routerConfig={{
        baseBreadcrumbs: [profilesBreadcrumb],
        defaultActive: 'all',
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <ProfilesDataTable />
        </Tab>
        <Tab eventKey="clients" title="Clientes">
          <ProfilesDataTable role="client" />
        </Tab>
        <Tab eventKey="guarantors" title="Garantes">
          <ProfilesDataTable role="guarantor" />
        </Tab>
        <Tab eventKey="loan-officers" title="Asesores">
          <ProfilesDataTable role="loanOfficer" />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProfilesPage

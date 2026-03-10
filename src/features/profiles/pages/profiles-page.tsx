import ProfilesDataTable from '../components/profiles-datatable'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import {
  AllIcon,
  buildPageLayoutCreateOption,
  GroupIcon,
  GroupsIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'

export const profilesBreadcrumb: BreadcrumbSpec = {
  title: 'Pérfiles',
  icon: GroupsIcon,
  pathname: '/profiles',
}

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

import ProfilesDataTable from '../components/profiles-datatable'
import type { BreadcrumbsByRoute, BreadcrumbSpec } from '@/components'
import {
  AllIcon,
  buildPageLayoutCreateOption,
  GroupIcon,
  GroupsIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'

export const profilesBreadcrumb: BreadcrumbSpec = {
  title: 'Pérfiles',
  icon: GroupsIcon,
  pathname: '/profiles',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
  [{ title: 'Clientes', icon: GroupIcon }],
  [{ title: 'Garantes', icon: GroupIcon }],
  [
    {
      title: 'Agentes',
      icon: GroupIcon,
    },
  ],
]

const ProfilesPage = () => {
  return (
    <PageRouterLayout
      title="Pérfiles"
      options={[buildPageLayoutCreateOption('/profiles/create')]}
      routerConfig={{
        baseBreadcrumbs: [profilesBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Todos</Tab>
          <Tab index={1}>Clientes</Tab>
          <Tab index={3}>Garantes</Tab>
          <Tab index={4}>Asesores</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProfilesDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <ProfilesDataTable role="client" />
        </TabPanel>
        <TabPanel index={2}>
          <ProfilesDataTable role="guarantor" />
        </TabPanel>
        <TabPanel index={3}>
          <ProfilesDataTable role="loanOfficer" />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProfilesPage

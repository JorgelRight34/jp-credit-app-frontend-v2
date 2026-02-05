import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import ProfilesDataTable from '../components/profiles-datatable'
import type { RouteBreadcrumbMap } from '@/components'
import {
  GroupIcon,
  PageRouterLayout,
  PublicIcon,
  Tab,
  TabsRouter,
  getPageLayoutOptions,
} from '@/components'

const tabBreadcrumbMap: RouteBreadcrumbMap = {
  all: { title: 'Todos', icon: () => <PublicIcon />, pathname: '.' },
  clients: { title: 'Clientes', icon: () => <GroupIcon />, pathname: '.' },
  guarantors: { title: 'Garantes', icon: () => <GroupIcon />, pathname: '.' },
  'loan-officers': {
    title: 'Agentes',
    icon: () => <GroupIcon />,
    pathname: '.',
  },
}

const ProfilesPage = () => {
  return (
    <PageRouterLayout
      title="Pérfiles"
      permissionProvider={profilesPermissionProvider}
      options={getPageLayoutOptions({ createPath: '/profiles/create' })}
      routerConfig={{
        baseBreadcrumbs: [profilesBreadcrumb],
        defaultActive: 'all',
        tabBreadcrumbMap,
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

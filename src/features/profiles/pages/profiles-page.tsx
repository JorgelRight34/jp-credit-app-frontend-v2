import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import ProfilesDataTable from '../components/profiles-datatable'
import {
  EntityLayout,
  EntityLayoutBreadcrumb,
  Tab,
  Tabs,
  getEntityLayoutOptions,
} from '@/components'

const ProfilesPage = () => {
  return (
    <EntityLayout
      title="Pérfiles"
      permissionProvider={profilesPermissionProvider}
      breadcrumb={<EntityLayoutBreadcrumb breadcrumbs={[profilesBreadcrumb]} />}
      options={getEntityLayoutOptions({ createPath: '/profiles/create' })}
    >
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="Todos">
          <ProfilesDataTable />
        </Tab>
        <Tab eventKey="clients" title="Clientes">
          <ProfilesDataTable role="client" />
        </Tab>
        <Tab eventKey="guarantors" title="Garantes">
          <ProfilesDataTable role="guarantor" />
        </Tab>
        <Tab eventKey="loanOfficers" title="Asesores">
          <ProfilesDataTable role="loanOfficer" />
        </Tab>
      </Tabs>
    </EntityLayout>
  )
}

export default ProfilesPage

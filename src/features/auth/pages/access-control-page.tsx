import UsersDataTable from '../components/users-datatable'
import { accessControlBreadcrumb } from '../lib/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { EntityLayout, Tab, Tabs, getEntityLayoutOptions } from '@/components'

const AccessControlPage = () => {
  return (
    <EntityLayout
      title="Control de Accesos"
      breadcrumbs={[accessControlBreadcrumb]}
      options={getEntityLayoutOptions({
        createPath: '/access-control/create',
      })}
      permissionProvider={accessControlPermissionProvider}
    >
      <Tabs defaultActiveKey="users">
        <Tab eventKey="users" title="Accesos">
          <UsersDataTable />
        </Tab>
        <Tab eventKey="other" title="Otros">
          ...
        </Tab>
      </Tabs>
    </EntityLayout>
  )
}

export default AccessControlPage

import UsersDataTable from '../components/users-datatable'
import { accessControlBreadcrumb } from '../lib/breadcrumbs'
import { accessControlPermissionProvider } from '../lib/config/permissionProvider'
import { EntityLayout, Tab, Tabs, getEntityLayoutOptions } from '@/components'
import { useSearchParams } from '@/hooks/useSearchParams'

const AccessControlPage = () => {
  const search = useSearchParams()

  return (
    <EntityLayout
      title="Accesos"
      breadcrumbs={[accessControlBreadcrumb]}
      options={getEntityLayoutOptions({
        createPath: '/access-control/create',
      })}
      permissionProvider={accessControlPermissionProvider}
    >
      <Tabs defaultActiveKey={search.get('defaultTab') ?? 'users'}>
        <Tab eventKey="users" title="Accesos">
          <UsersDataTable />
        </Tab>
        <Tab eventKey="roles" title="Roles">
          ...
        </Tab>
      </Tabs>
    </EntityLayout>
  )
}

export default AccessControlPage

import {
  AllIcon,
  BreadcrumbsByRoute,
  getPageLayoutOptions,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import LoanDataTable from '../components/loan-datatable'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { loanBreadcrumb } from '../lib/config/breadcrumb'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: { title: 'Todos', icon: AllIcon },
}

const LoansPage = () => {
  return (
    <PageRouterLayout
      title="Préstamos"
      permissionProvider={loanPermissionProvider}
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [loanBreadcrumb],
        breadcrumbsByRoute,
      }}
      options={getPageLayoutOptions({ createPath: '/loans/create' })}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <LoanDataTable />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default LoansPage

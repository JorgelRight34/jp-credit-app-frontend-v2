import {
  AllIcon,
  BreadcrumbsByRoute,
  getPageLayoutOptions,
  PageRouterLayout,
  RestoreIcon,
  Tab,
  TabsRouter,
  TodayIcon,
} from '@/components'
import LoanDataTable from '../components/loan-datatable'
import { loanPermissionProvider } from '../lib/config/permission-provider'
import { loanBreadcrumb } from '../lib/config/breadcrumb'
import { LoanStatusMap } from '../models/loanStatus'
import { ProjectSelectionGuard } from '@/features/projects'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: { title: 'Todos', icon: AllIcon },
  inactive: { title: 'Inactivos', icon: RestoreIcon },
  active: { title: 'Activos', icon: TodayIcon },
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
      <ProjectSelectionGuard>
        <TabsRouter>
          <Tab eventKey="all" title="Todos">
            <LoanDataTable />
          </Tab>
          <Tab eventKey="inactive" title="Activos">
            <LoanDataTable initialQuery={{ status: LoanStatusMap.active }} />
          </Tab>
          <Tab eventKey="inactive" title="Inactivos">
            <LoanDataTable initialQuery={{ status: LoanStatusMap.paidOff }} />
          </Tab>
        </TabsRouter>
      </ProjectSelectionGuard>
    </PageRouterLayout>
  )
}

export default LoansPage

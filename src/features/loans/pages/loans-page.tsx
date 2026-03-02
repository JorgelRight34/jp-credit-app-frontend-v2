import {
  AllIcon,
  BreadcrumbsByRoute,
  CheckCircleIcon,
  buildPageLayoutCreateOption,
  PageRouterLayout,
  RestoreIcon,
  Tab,
  TabsRouter,
  TodayIcon,
} from '@/components'
import LoanDataTable from '../components/loan-datatable'
import { loanBreadcrumb } from '../lib/config/breadcrumb'
import { LoanStatusMap } from '../models/loanStatus'
import { ProjectSelectionGuard } from '@/features/projects'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
  inactive: [{ title: 'Inactivos', icon: RestoreIcon }],
  active: [{ title: 'Activos', icon: TodayIcon }],
  paidOff: [{ title: 'Saldados', icon: CheckCircleIcon }],
}

const LoansPage = () => {
  return (
    <PageRouterLayout
      title="Préstamos"
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [loanBreadcrumb],
        breadcrumbsByRoute,
      }}
      options={[buildPageLayoutCreateOption('/loans/create')]}
    >
      <ProjectSelectionGuard>
        <TabsRouter>
          <Tab eventKey="all" title="Todos">
            <LoanDataTable />
          </Tab>
          <Tab eventKey="active" title="Activos">
            <LoanDataTable initialQuery={{ status: LoanStatusMap.active }} />
          </Tab>
          <Tab eventKey="inactive" title="Inactivos">
            <LoanDataTable initialQuery={{ status: LoanStatusMap.inactive }} />
          </Tab>
          <Tab eventKey="paidOff" title="Saldados">
            <LoanDataTable initialQuery={{ maxPrincipalBalance: 0 }} />
          </Tab>
        </TabsRouter>
      </ProjectSelectionGuard>
    </PageRouterLayout>
  )
}

export default LoansPage

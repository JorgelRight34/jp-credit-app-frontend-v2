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
  MailIcon,
  BreadcrumbSpec,
} from '@/components'
import LoanDataTable from '../components/loan-datatable'
import { LoanStatusMap } from '../models/loanStatus'
import { ProjectSelectionGuard } from '@/features/projects'

export const loanModuleBreadcrumb: BreadcrumbSpec = {
  title: 'Préstamos',
  icon: MailIcon,
  pathname: '/loans',
}

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
        baseBreadcrumbs: [loanModuleBreadcrumb],
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

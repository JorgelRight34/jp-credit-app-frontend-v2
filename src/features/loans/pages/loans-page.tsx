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
  TabsList,
  TabPanel,
} from '@/components'
import LoanDataTable from '../components/loan-datatable'
import { LoanStatusMap } from '../models/loanStatus'

export const loanModuleBreadcrumb: BreadcrumbSpec = {
  title: 'Préstamos',
  icon: MailIcon,
  pathname: '/loans',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
  [{ title: 'Inactivos', icon: RestoreIcon }],
  [{ title: 'Activos', icon: TodayIcon }],
  [{ title: 'Saldados', icon: CheckCircleIcon }],
]

const LoansPage = () => {
  return (
    <PageRouterLayout
      title="Préstamos"
      routerConfig={{
        baseBreadcrumbs: [loanModuleBreadcrumb],
        breadcrumbsByRoute,
      }}
      options={[buildPageLayoutCreateOption('/loans/create')]}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Todos</Tab>
          <Tab index={1}>Activos</Tab>
          <Tab index={2}>Inactivos</Tab>
          <Tab index={3}>Saldados</Tab>
        </TabsList>
        <TabPanel index={0}>
          <LoanDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <LoanDataTable initialQuery={{ status: LoanStatusMap.active }} />
        </TabPanel>
        <TabPanel index={2}>
          <LoanDataTable initialQuery={{ status: LoanStatusMap.inactive }} />
        </TabPanel>
        <TabPanel index={3}>
          <LoanDataTable initialQuery={{ maxPrincipalBalance: 0 }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default LoansPage

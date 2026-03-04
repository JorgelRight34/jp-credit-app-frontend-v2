import {
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  LoanIcon,
  PageRouterLayout,
  ReportIcon,
  Tab,
  TabsRouter,
} from '@/components'
import ReportDataTable from '../components/report-datatable'

export const reportsBreadcrumb: BreadcrumbSpec = {
  title: 'Reportes',
  icon: ReportIcon,
  pathname: '/reports',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ icon: AllIcon, title: 'Todos' }],
  loans: [{ icon: LoanIcon, title: 'Préstamos' }],
}

const ReportsPage = () => {
  return (
    <PageRouterLayout
      title="Reportes"
      options={[buildPageLayoutCreateOption('/reports/create')]}
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [reportsBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <ReportDataTable />
        </Tab>
        <Tab eventKey="loans" title="Préstamos">
          <ReportDataTable initialQuery={{ key: 'loans' }} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ReportsPage

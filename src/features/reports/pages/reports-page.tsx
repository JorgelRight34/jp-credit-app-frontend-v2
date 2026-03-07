import {
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  LightPillLinkBtn,
  PageRouterLayout,
  PrintIcon,
  ReportIcon,
  Tab,
  TabsRouter,
  UploadIcon,
} from '@/components'
import ReportDataTable from '../components/report-datatable'

export const reportsBreadcrumb: BreadcrumbSpec = {
  title: 'Reportes',
  icon: ReportIcon,
  pathname: '/reports',
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ icon: AllIcon, title: 'Todos' }],
  uploads: [{ icon: UploadIcon, title: 'Archivos' }],
}

const ReportsPage = () => {
  return (
    <PageRouterLayout
      title="Reportes"
      options={[
        {
          title: 'Generar',
          to: '/reports/generate',
          icon: PrintIcon,
          component: LightPillLinkBtn,
        },
        buildPageLayoutCreateOption('/reports/create'),
      ]}
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
        <Tab eventKey="uploads" title="Archivos">
          ...
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ReportsPage

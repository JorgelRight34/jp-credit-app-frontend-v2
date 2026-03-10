import {
  BarChartIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  FinanceIcon,
  PageRouterLayout,
  Tab,
  TableRowsIcon,
  TabsRouter,
} from '@/components'
import ProjectionsDataTable from '../components/projections-datatable'
import ProjectionsDataChart from '../components/projections-datachart'

export const financeSectionBreadcrumbsByRoute: BreadcrumbsByRoute = {
  table: [{ title: 'Tabla', icon: TableRowsIcon }],
  chart: [{ title: 'Grafica', icon: BarChartIcon }],
}

export const financeBreadcrumb: BreadcrumbSpec = {
  icon: FinanceIcon,
  title: 'Finanzas',
}

const ProjectionsPage = () => {
  return (
    <PageRouterLayout
      title="Proyecciones"
      routerConfig={{
        defaultActive: 'table',
        baseBreadcrumbs: [financeBreadcrumb],
        breadcrumbsByRoute: financeSectionBreadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="table" title="Tabla">
          <ProjectionsDataTable />
        </Tab>
        <Tab eventKey="chart" title="Gráfica">
          <ProjectionsDataChart />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProjectionsPage

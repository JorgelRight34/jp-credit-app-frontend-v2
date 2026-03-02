import {
  buildPageLayoutExportToExcel,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import {
  financeBreadcrumb,
  financeSectionBreadcrumbsByRoute,
} from '../lib/config/breadcrumb'
import ProjectionsDataTable from '../components/projections-datatable'
import ProjectionsDataChart from '../components/projections-datachart'

const ProjectionsPage = () => {
  return (
    <PageRouterLayout
      title="Proyecciones"
      options={[buildPageLayoutExportToExcel()]}
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

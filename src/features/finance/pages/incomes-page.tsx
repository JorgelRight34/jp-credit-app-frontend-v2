import { PageRouterLayout, Tab, TabsRouter } from '@/components'
import IncomesDataTable from '../components/incomes-datatable'
import IncomesDataChart from '../components/incomes-datachart'
import {
  financeBreadcrumb,
  financeSectionBreadcrumbsByRoute,
} from './projections-page'

const IncomesPage = () => {
  return (
    <PageRouterLayout
      title="Ingresos"
      routerConfig={{
        defaultActive: 'table',
        baseBreadcrumbs: [financeBreadcrumb],
        breadcrumbsByRoute: financeSectionBreadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="table" title="Tabla">
          <IncomesDataTable />
        </Tab>
        <Tab eventKey="chart" title="Gráfica">
          <IncomesDataChart />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default IncomesPage

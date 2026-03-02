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
import ExpensesDataTable from '../components/expenses-datatable'
import ExpensesDataChart from '../components/expenses-datachart'

const ExpensesPage = () => {
  return (
    <PageRouterLayout
      title="Egresos"
      options={[buildPageLayoutExportToExcel()]}
      routerConfig={{
        defaultActive: 'table',
        baseBreadcrumbs: [financeBreadcrumb],
        breadcrumbsByRoute: financeSectionBreadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="table" title="Tabla">
          <ExpensesDataTable />
        </Tab>
        <Tab eventKey="chart" title="Gráfica">
          <ExpensesDataChart />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ExpensesPage

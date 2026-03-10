import { PageRouterLayout, Tab, TabsRouter } from '@/components'
import ExpensesDataTable from '../components/expenses-datatable'
import ExpensesDataChart from '../components/expenses-datachart'
import {
  financeBreadcrumb,
  financeSectionBreadcrumbsByRoute,
} from './projections-page'

const ExpensesPage = () => {
  return (
    <PageRouterLayout
      title="Egresos"
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

import {
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
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
        baseBreadcrumbs: [financeBreadcrumb],
        breadcrumbsByRoute: financeSectionBreadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Tabla</Tab>
          <Tab index={1}>Gráfica</Tab>
        </TabsList>
        <TabPanel index={0}>
          <IncomesDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <IncomesDataChart />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default IncomesPage

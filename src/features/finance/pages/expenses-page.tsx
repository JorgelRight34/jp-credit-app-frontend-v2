import {
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import ExpensesDataTable from '../components/expenses-datatable'
import ExpensesDataChart from '../components/expenses-datachart'
import {
  financeBreadcrumb,
  financeSectionBreadcrumbsByRoute,
} from './projections-page'
import { PropsWithProjectId } from '@/features/projects'

const ExpensesPage = ({ projectId }: PropsWithProjectId) => {
  return (
    <PageRouterLayout
      title="Egresos"
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
          <ExpensesDataTable
            initialQuery={{
              projectId,
            }}
          />
        </TabPanel>
        <TabPanel index={1}>
          <ExpensesDataChart initialQuery={{ projectId }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ExpensesPage

import {
  BarChartIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  FinanceIcon,
  PageRouterLayout,
  Tab,
  TableRowsIcon,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import ProjectionsDataTable from '../components/projections-datatable'
import ProjectionsDataChart from '../components/projections-datachart'
import { PropsWithProjectId } from '@/features/projects'

export const financeSectionBreadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Tabla', icon: TableRowsIcon }],
  [{ title: 'Grafica', icon: BarChartIcon }],
]

export const financeBreadcrumb: BreadcrumbSpec = {
  icon: FinanceIcon,
  title: 'Finanzas',
}

const ProjectionsPage = ({ projectId }: PropsWithProjectId) => {
  return (
    <PageRouterLayout
      title="Proyecciones"
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
          <ProjectionsDataTable initialQuery={{ projectId }} />
        </TabPanel>
        <TabPanel index={1}>
          <ProjectionsDataChart initialQuery={{ projectId }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProjectionsPage

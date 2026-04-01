import {
  BarChartIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  FinanceIcon,
  OverviewIcon,
  PageRouterLayout,
  Tab,
  TableRowsIcon,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import ProjectionsDataTable from '../components/projections-datatable'
import ProjectionsDataChart from '../components/projections-datachart'
import ProjectionsSummaryPanel from '../components/projections-summary-panel'

export const financeSectionBreadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Tabla', icon: TableRowsIcon }],
  [{ title: 'Resumen', icon: OverviewIcon }],
  [{ title: 'Grafica', icon: BarChartIcon }],
]

export const financeBreadcrumb: BreadcrumbSpec = {
  icon: FinanceIcon,
  title: 'Finanzas',
}

const ProjectionsPage = () => {
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
          <Tab index={1}>Resumen</Tab>
          <Tab index={2}>Gráfica</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ProjectionsDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <ProjectionsSummaryPanel />
        </TabPanel>
        <TabPanel index={2}>
          <ProjectionsDataChart />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ProjectionsPage

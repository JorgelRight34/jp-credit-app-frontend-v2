import {
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  LightPillLinkBtn,
  PageLayout,
  PageLayoutBreadcrumb,
  PrintIcon,
  ReportIcon,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import ReportDataTable from '../components/report-datatable'

export const reportsBreadcrumb: BreadcrumbSpec = {
  title: 'Reportes',
  icon: ReportIcon,
  pathname: '/reports',
}

const ReportsPage = () => {
  return (
    <PageLayout
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
      breadcrumb={<PageLayoutBreadcrumb breadcrumbs={[reportsBreadcrumb]} />}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Todos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ReportDataTable />
        </TabPanel>
      </Tabs>
    </PageLayout>
  )
}

export default ReportsPage

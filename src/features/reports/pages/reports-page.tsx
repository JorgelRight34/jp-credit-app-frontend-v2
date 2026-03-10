import {
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  LightPillLinkBtn,
  PageLayout,
  PageLayoutBreadcrumb,
  PrintIcon,
  ReportIcon,
  Tab,
  TabList,
  TabsPanelContainer,
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
      <TabList>
        <Tab title="Todos" isActive />
      </TabList>
      <TabsPanelContainer>
        <ReportDataTable />
      </TabsPanelContainer>
    </PageLayout>
  )
}

export default ReportsPage

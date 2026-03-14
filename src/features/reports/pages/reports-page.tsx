import {
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  LightPillLinkBtn,
  PageLayout,
  PageLayoutBreadcrumb,
  PagePanel,
  PrintIcon,
  ReportIcon,
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
      <PagePanel>
        <ReportDataTable />
      </PagePanel>
    </PageLayout>
  )
}

export default ReportsPage

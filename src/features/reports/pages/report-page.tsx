import {
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutEditOption,
  DownloadIcon,
  FileTable,
  mapApiFileToTableFile,
  PageRouterLayout,
  PrintIcon,
  ReportIcon,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import { Report } from '../models/report'
import { reportsBreadcrumb } from './reports-page'
import SavedReportGenerationForm from '../components/saved-report-generation-form.tsx'

export const buildReportBreadcrumb = (report: Report): BreadcrumbSpec => ({
  icon: ReportIcon,
  title: report.title,
  pathname: '/reports/$id',
  params: { id: report.id.toString() },
})

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ icon: PrintIcon, title: 'Generar' }],
  [{ icon: DownloadIcon, title: 'Archivos' }],
]

const ReportPage = ({ report }: { report: Report }) => {
  return (
    <PageRouterLayout
      title={report.title}
      options={[
        buildPageLayoutEditOption('/reports/$id/edit', {
          id: report.id.toString(),
        }),
      ]}
      routerConfig={{
        baseBreadcrumbs: [reportsBreadcrumb, buildReportBreadcrumb(report)],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Generar</Tab>
          <Tab index={1}>Archivos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <SavedReportGenerationForm report={report} />
        </TabPanel>
        <TabPanel index={1}>
          <FileTable files={report.documents.map(mapApiFileToTableFile)} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ReportPage

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
  TabsRouter,
} from '@/components'
import { Report } from '../models/report'
import { reportsBreadcrumb } from './reports-page'
import SavedReportGenerationForm from '../components/saved-report-generation-form.tsx'

export const buildReportBreadcrumb = (report: Report): BreadcrumbSpec => ({
  icon: ReportIcon,
  title: report.title,
})

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  generate: [{ icon: PrintIcon, title: 'Generar' }],
  files: [{ icon: DownloadIcon, title: 'Archivos' }],
}

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
        defaultActive: 'generate',
        baseBreadcrumbs: [reportsBreadcrumb, buildReportBreadcrumb(report)],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <Tab eventKey="generate" title="Generar">
          <SavedReportGenerationForm report={report} />
        </Tab>
        <Tab eventKey="files" title="Archivos">
          <section>
            <FileTable files={report.documents.map(mapApiFileToTableFile)} />
          </section>
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ReportPage

import {
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutEditOption,
  DownloadIcon,
  FileTable,
  InputElement,
  mapApiFileToTableFile,
  PageRouterLayout,
  PrintIcon,
  ReportIcon,
  Route,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
} from '@/components'
import { Report } from '../models/report'
import { GenerateReportHandler } from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { reportsBreadcrumb } from './reports-page-layout'
import SavedReportGenerationForm from '../components/saved-report-generation-form'

export const buildReportBreadcrumb = (report: Report): BreadcrumbSpec => ({
  icon: ReportIcon,
  title: report.title,
  pathname: '..',
})

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ icon: PrintIcon, title: 'Generar' }],
  [{ icon: DownloadIcon, title: 'Archivos' }],
]

export interface ReportPageProps {
  report: Report
}

interface ReportPageLayoutProps<T> extends ReportPageProps {
  report: Report
  editRoute: Route
  breadcrumb: BreadcrumbSpec
  templateDefinition: ReportTemplateDefinition<T>
  onSubmit: GenerateReportHandler
  searchInput: InputElement
}

const ReportPageLayout = <T,>({
  report,
  breadcrumb,
  editRoute,
  ...config
}: ReportPageLayoutProps<T>) => {
  return (
    <PageRouterLayout
      title={report.title}
      options={[
        buildPageLayoutEditOption(editRoute, {
          id: report.id.toString(),
        }),
      ]}
      routerConfig={{
        baseBreadcrumbs: [
          breadcrumb,
          reportsBreadcrumb,
          buildReportBreadcrumb(report),
        ],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Generar</Tab>
          <Tab index={1}>Archivos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <SavedReportGenerationForm report={report} {...config} />
        </TabPanel>
        <TabPanel index={1}>
          <FileTable files={report.documents.map(mapApiFileToTableFile)} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ReportPageLayout

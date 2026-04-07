import {
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutEditOption,
  DownloadIcon,
  FileTable,
  LinkProps,
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
import { reportsBreadcrumb } from './reports-page-layout'
import SavedReportGenerationForm from './saved-report-generation-form'

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

interface ReportPageLayoutProps extends ReportPageProps {
  report: Report
  editRoute: LinkProps['to']
  breadcrumb: BreadcrumbSpec
}

const ReportPageLayout = ({
  report,
  breadcrumb,
  editRoute,
}: ReportPageLayoutProps) => {
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
          reportsBreadcrumb,
          breadcrumb,
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
          <SavedReportGenerationForm report={report} />
        </TabPanel>
        <TabPanel index={1}>
          <FileTable files={report.documents.map(mapApiFileToTableFile)} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default ReportPageLayout

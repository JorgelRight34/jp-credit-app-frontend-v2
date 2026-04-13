import {
  BreadcrumbSpec,
  buildPageLayoutDeleteOption,
  EditFormPageLayout,
  PermissionsProvider,
  Route,
  RouteParams,
} from '@/components'
import EditReportForm from '../components/edit-report-form'
import { Report } from '../models/report'
import {
  DeleteFilesHandler,
  EditReportHandler,
  UploadFilesHandler,
} from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { reportsBreadcrumb } from './reports-page-layout'
import { buildReportBreadcrumb } from './report-page-layout'

interface EditReportPageProps<T> {
  report: Report
  breadcrumb: BreadcrumbSpec
  templateDefinition: ReportTemplateDefinition<T>
  deleteRoute: Route
  onUpload: UploadFilesHandler
  onDelete: DeleteFilesHandler
  onEdit: EditReportHandler
}

const EditReportPageLayout = <T,>({
  report,
  breadcrumb,
  deleteRoute,
  ...config
}: EditReportPageProps<T>) => (
  <EditFormPageLayout
    title={`Editar ${report.title}`}
    breadcrumbs={[breadcrumb, reportsBreadcrumb, buildReportBreadcrumb(report)]}
    options={[
      buildPageLayoutDeleteOption({
        to: deleteRoute,
        params: { id: report.id.toString() },
      }),
    ]}
  >
    <EditReportForm report={report} {...config} />
  </EditFormPageLayout>
)

export default EditReportPageLayout

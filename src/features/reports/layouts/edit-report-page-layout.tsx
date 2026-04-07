import {
  BreadcrumbSpec,
  EditFormPageLayout,
  PermissionsProvider,
} from '@/components'
import EditReportForm from '../components/edit-report-form'
import { Report } from '../models/report'
import { EditReportHandler } from '../models/handlers'
import { ReportTemplateDefinition } from '../models/reportTemplateDefinition'
import { reportsBreadcrumb } from './reports-page-layout'
import { buildReportBreadcrumb } from './report-page-layout'

interface EditReportPageProps<T> {
  report: Report
  permissionProvider: PermissionsProvider
  breadcrumb: BreadcrumbSpec
  templateDefinition: ReportTemplateDefinition<T>
  onEdit: EditReportHandler
}

const EditReportPageLayout = <T,>({
  report,
  breadcrumb,
  permissionProvider,
  ...config
}: EditReportPageProps<T>) => (
  <EditFormPageLayout
    title={`Editar ${report.title}`}
    breadcrumbs={[reportsBreadcrumb, breadcrumb, buildReportBreadcrumb(report)]}
    permissionProvider={permissionProvider}
  >
    <EditReportForm report={report} {...config} />
  </EditFormPageLayout>
)

export default EditReportPageLayout

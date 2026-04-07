import {
  BreadcrumbSpec,
  EditFormPageLayout,
  PermissionsProvider,
} from '@/components'
import EditReportForm from '../components/edit-report-form'
import { Report } from '../models/report'
import { reportsBreadcrumb } from './reports-page-layout'
import { buildReportBreadcrumb } from './report-page-layout'

interface EditReportPageProps {
  report: Report
  permissionProvider: PermissionsProvider
  breadcrumb: BreadcrumbSpec
}

const EditReportPageLayout = ({
  report,
  breadcrumb,
  permissionProvider,
}: EditReportPageProps) => (
  <EditFormPageLayout
    title={`Editar ${report.title}`}
    breadcrumbs={[reportsBreadcrumb, breadcrumb, buildReportBreadcrumb(report)]}
    permissionProvider={permissionProvider}
  >
    <EditReportForm report={report} />
  </EditFormPageLayout>
)

export default EditReportPageLayout

import { EditFormPageLayout } from '@/components'
import { reportPermissionProvider } from '../lib/permission-provider'
import { reportsBreadcrumb } from './reports-page'
import EditReportForm from '../components/edit-report-form'
import { Report } from '../models/report'
import { buildReportBreadcrumb } from './report-page'

const EditReportPage = ({ report }: { report: Report }) => {
  return (
    <EditFormPageLayout
      title={`Editar ${report.title}`}
      breadcrumbs={[reportsBreadcrumb, buildReportBreadcrumb(report)]}
      permissionProvider={reportPermissionProvider}
    >
      <EditReportForm report={report} />
    </EditFormPageLayout>
  )
}

export default EditReportPage

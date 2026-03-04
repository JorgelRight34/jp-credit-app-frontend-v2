import { CreateFormPageLayout, ReportIcon } from '@/components'
import { reportPermissionProvider } from '../lib/permission-provider'
import { reportsBreadcrumb } from './reports-page'
import EditReportForm from '../components/edit-report-form'
import { Report } from '../models/report'

const EditReportPage = ({ report }: { report: Report }) => {
  return (
    <CreateFormPageLayout
      title={`Editar ${report.title}`}
      breadcrumbs={[
        reportsBreadcrumb,
        { icon: ReportIcon, title: report.title },
      ]}
      permissionProvider={reportPermissionProvider}
    >
      <EditReportForm report={report} />
    </CreateFormPageLayout>
  )
}

export default EditReportPage

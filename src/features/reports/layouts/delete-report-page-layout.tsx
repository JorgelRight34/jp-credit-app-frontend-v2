import { BreadcrumbSpec, DeleteFormPageLayout } from '@/components'
import { reportsBreadcrumb } from './reports-page-layout'
import { buildReportBreadcrumb } from './report-page-layout'
import { Report } from '../models/report'
import DeleteReportForm from '../components/delete-report-form'

export interface DeleteReportPageProps {
  report: Report
}

interface DeleteReportPageLayoutProps {
  report: Report
  breadcrumb: BreadcrumbSpec
  onDelete: (id: Report['id']) => Promise<void>
}

const DeleteReportPageLayout = ({
  report,
  breadcrumb,
  onDelete,
}: DeleteReportPageLayoutProps) => (
  <DeleteFormPageLayout
    title={report.title}
    breadcrumbs={[breadcrumb, reportsBreadcrumb, buildReportBreadcrumb(report)]}
  >
    <DeleteReportForm report={report} onDelete={onDelete} />
  </DeleteFormPageLayout>
)

export default DeleteReportPageLayout

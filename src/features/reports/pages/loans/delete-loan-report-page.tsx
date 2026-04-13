import { loanModuleBreadcrumb } from '@/features/loans'
import DeleteReportPageLayout, {
  DeleteReportPageProps,
} from '../../layouts/delete-report-page-layout'
import { deleteLoanReport } from '../../services/reportsClient'

const DeleteLoanReportPage = ({ report }: DeleteReportPageProps) => (
  <DeleteReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    report={report}
    onDelete={deleteLoanReport}
  />
)

export default DeleteLoanReportPage

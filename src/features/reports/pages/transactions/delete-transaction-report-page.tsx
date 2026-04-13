import DeleteReportPageLayout, {
  DeleteReportPageProps,
} from '../../layouts/delete-report-page-layout'
import { deleteTransactionReport } from '../../services/reportsClient'
import { transactionBreadcrumb } from '@/features/transactions'

const DeleteTransactionReportPage = ({ report }: DeleteReportPageProps) => (
  <DeleteReportPageLayout
    breadcrumb={transactionBreadcrumb}
    report={report}
    onDelete={deleteTransactionReport}
  />
)

export default DeleteTransactionReportPage

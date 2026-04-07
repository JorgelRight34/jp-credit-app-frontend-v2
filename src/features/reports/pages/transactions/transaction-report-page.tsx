import ReportPageLayout, {
  ReportPageProps,
} from '../../components/report-page-layout'
import { transactionBreadcrumb } from '@/features/transactions'

const TransactionReportPage = ({ report }: ReportPageProps) => (
  <ReportPageLayout
    breadcrumb={transactionBreadcrumb}
    editRoute="/transactions/reports/$id"
    report={report}
  />
)

export default TransactionReportPage

import {
  getTransactionReports,
  ReportsDataTable,
  ReportsPageLayout,
} from '@/features/reports'
import { transactionBreadcrumb } from '@/features/transactions'

const TransactionReportsPage = () => (
  <ReportsPageLayout
    title="Reportes"
    createRoute="/transactions/reports/create"
    generateRoute="/transactions/reports/generate"
    breadcrumb={transactionBreadcrumb}
  >
    <ReportsDataTable
      reportPageRoute="/transactions/reports/$id"
      loader={getTransactionReports}
    />
  </ReportsPageLayout>
)

export default TransactionReportsPage

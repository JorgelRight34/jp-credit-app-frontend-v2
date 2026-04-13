import {
  getTransactionReports,
  ReportsDataTable,
  ReportsPageLayout,
} from '@/features/reports'
import {
  transactionBreadcrumb,
  transactionsQueryKey,
} from '@/features/transactions'

const TransactionReportsPage = () => (
  <ReportsPageLayout
    title="Reportes"
    createRoute="/transactions/reports/create"
    generateRoute="/transactions/reports/generate"
    breadcrumb={transactionBreadcrumb}
  >
    <ReportsDataTable
      reportPageRoute="/transactions/reports/$id"
      cacheKey={transactionsQueryKey}
      loader={getTransactionReports}
    />
  </ReportsPageLayout>
)

export default TransactionReportsPage

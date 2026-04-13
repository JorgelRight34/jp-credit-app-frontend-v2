import {
  transactionBreadcrumb,
  TransactionSearchInput,
} from '@/features/transactions'
import { generateTransactionReport } from '../../services/reportsClient'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import ReportPageLayout, {
  ReportPageProps,
} from '../../layouts/report-page-layout'

const TransactionReportPage = ({ report }: ReportPageProps) => (
  <ReportPageLayout
    breadcrumb={transactionBreadcrumb}
    templateDefinition={transactionTemplateDefinition}
    editRoute="/transactions/reports/$id/edit"
    report={report}
    searchInput={TransactionSearchInput}
    onSubmit={generateTransactionReport}
  />
)

export default TransactionReportPage

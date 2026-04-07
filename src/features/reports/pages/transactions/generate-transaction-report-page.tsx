import {
  transactionBreadcrumb,
  TransactionSearchInput,
} from '@/features/transactions'
import { generateTransactionReport } from '../../services/reportsClient'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import GenerateReportPageLayout from '../../layouts/generate-report-page-layout'

const GenerateTransactionReportPage = () => (
  <GenerateReportPageLayout
    breadcrumb={transactionBreadcrumb}
    templateDefinition={transactionTemplateDefinition}
    searchInput={TransactionSearchInput}
    onSubmit={generateTransactionReport}
  />
)

export default GenerateTransactionReportPage

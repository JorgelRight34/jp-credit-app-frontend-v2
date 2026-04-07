import GenerateReportPageLayout from '../../components/generate-report-page-layout'
import { transactionBreadcrumb } from '@/features/transactions'

const GenerateTransactionReportPage = () => (
  <GenerateReportPageLayout
    breadcrumb={transactionBreadcrumb}
    reportKey="Loan"
  />
)

export default GenerateTransactionReportPage

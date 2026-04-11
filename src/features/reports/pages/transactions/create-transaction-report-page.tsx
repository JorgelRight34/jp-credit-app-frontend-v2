import { transactionBreadcrumb } from '@/features/transactions'
import {
  createTransactionReport,
  uploadCollateralReportFiles,
} from '../../services/reportsClient'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import CreateReportPageLayout from '../../layouts/create-report-page-layout'

const CreateTransactionReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={transactionBreadcrumb}
    templateDefinition={transactionTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onSubmit={createTransactionReport}
  />
)

export default CreateTransactionReportPage

import {
  transactionBreadcrumb,
  transactionReportPermissionProvider,
} from '@/features/transactions'
import {
  createTransactionReport,
  deleteCollateralReportFiles,
  uploadCollateralReportFiles,
} from '../../services/reportsClient'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import CreateReportPageLayout from '../../layouts/create-report-page-layout'

const CreateTransactionReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={transactionBreadcrumb}
    permissionProvider={transactionReportPermissionProvider}
    templateDefinition={transactionTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onDelete={deleteCollateralReportFiles}
    onSubmit={createTransactionReport}
  />
)

export default CreateTransactionReportPage

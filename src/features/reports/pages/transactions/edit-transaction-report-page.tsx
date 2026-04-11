import {
  deleteCollateralReportFiles,
  editTransactionReport,
  PropsWithReport,
  uploadCollateralReportFiles,
} from '@/features/reports'
import { transactionBreadcrumb } from '@/features/transactions'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import EditReportPageLayout from '../../layouts/edit-report-page-layout'

const EditTransactionReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={transactionBreadcrumb}
    report={report}
    templateDefinition={transactionTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onDelete={deleteCollateralReportFiles}
    onEdit={editTransactionReport}
  />
)

export default EditTransactionReportPage

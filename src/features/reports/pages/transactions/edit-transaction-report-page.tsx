import { editTransactionReport, PropsWithReport } from '@/features/reports'
import {
  transactionBreadcrumb,
  transactionPermissionProvider,
} from '@/features/transactions'
import { transactionTemplateDefinition } from '../../lib/templates/transaction-template-definition'
import EditReportPageLayout from '../../layouts/edit-report-page-layout'

const EditTransactionReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={transactionBreadcrumb}
    report={report}
    permissionProvider={transactionPermissionProvider}
    templateDefinition={transactionTemplateDefinition}
    onEdit={editTransactionReport}
  />
)

export default EditTransactionReportPage

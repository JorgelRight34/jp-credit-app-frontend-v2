import { PropsWithReport } from '@/features/reports'
import EditReportPageLayout from '../../components/edit-report-page-layout'
import {
  transactionBreadcrumb,
  transactionPermissionProvider,
} from '@/features/transactions'

const EditTransactionReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={transactionBreadcrumb}
    report={report}
    permissionProvider={transactionPermissionProvider}
  />
)

export default EditTransactionReportPage

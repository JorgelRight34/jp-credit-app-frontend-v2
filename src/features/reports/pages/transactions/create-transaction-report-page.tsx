import CreateReportPageLayout from '../../components/create-report-page-layout'
import {
  transactionBreadcrumb,
  transactionReportPermissionProvider,
} from '@/features/transactions'

const CreateTransactionReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={transactionBreadcrumb}
    reportKey="Transaction"
    permissionProvider={transactionReportPermissionProvider}
  />
)

export default CreateTransactionReportPage

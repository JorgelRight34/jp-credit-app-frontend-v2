import {
  loanModuleBreadcrumb,
  loanReportPermissionProvider,
} from '@/features/loans'
import CreateReportPageLayout from '../../components/create-report-page-layout'

const CreateLoanReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    reportKey="Loan"
    permissionProvider={loanReportPermissionProvider}
  />
)

export default CreateLoanReportPage

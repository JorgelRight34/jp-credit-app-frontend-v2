import {
  loanModuleBreadcrumb,
  loanReportPermissionProvider,
} from '@/features/loans'
import { PropsWithReport } from '@/features/reports'
import EditReportPageLayout from '../../components/edit-report-page-layout'

const EditLoanReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    report={report}
    permissionProvider={loanReportPermissionProvider}
  />
)

export default EditLoanReportPage

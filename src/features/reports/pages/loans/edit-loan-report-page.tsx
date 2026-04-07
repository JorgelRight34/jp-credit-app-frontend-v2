import {
  loanModuleBreadcrumb,
  loanReportPermissionProvider,
} from '@/features/loans'
import { editLoanReport, PropsWithReport } from '@/features/reports'
import { loanTemplateDefinition } from '../../lib/templates/loan-template-definition'
import EditReportPageLayout from '../../layouts/edit-report-page-layout'

const EditLoanReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    report={report}
    permissionProvider={loanReportPermissionProvider}
    templateDefinition={loanTemplateDefinition}
    onEdit={editLoanReport}
  />
)

export default EditLoanReportPage

import {
  loanModuleBreadcrumb,
  loanReportPermissionProvider,
} from '@/features/loans'
import {
  createLoanReport,
  deleteCollateralReportFiles,
  uploadCollateralReportFiles,
} from '../../services/reportsClient'
import { loanTemplateDefinition } from '../../lib/templates/loan-template-definition'
import CreateReportPageLayout from '../../layouts/create-report-page-layout'

const CreateLoanReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    permissionProvider={loanReportPermissionProvider}
    templateDefinition={loanTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onDelete={deleteCollateralReportFiles}
    onSubmit={createLoanReport}
  />
)

export default CreateLoanReportPage

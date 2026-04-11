import { loanModuleBreadcrumb } from '@/features/loans'
import {
  createLoanReport,
  uploadCollateralReportFiles,
} from '../../services/reportsClient'
import { loanTemplateDefinition } from '../../lib/templates/loan-template-definition'
import CreateReportPageLayout from '../../layouts/create-report-page-layout'

const CreateLoanReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    templateDefinition={loanTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onSubmit={createLoanReport}
  />
)

export default CreateLoanReportPage

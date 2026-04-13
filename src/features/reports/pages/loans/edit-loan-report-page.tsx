import { loanModuleBreadcrumb } from '@/features/loans'
import {
  deleteCollateralReportFiles,
  editLoanReport,
  PropsWithReport,
  uploadCollateralReportFiles,
} from '@/features/reports'
import { loanTemplateDefinition } from '../../lib/templates/loan-template-definition'
import EditReportPageLayout from '../../layouts/edit-report-page-layout'

const EditLoanReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    report={report}
    templateDefinition={loanTemplateDefinition}
    deleteRoute="/loans/reports/$id/delete"
    onUpload={uploadCollateralReportFiles}
    onDelete={deleteCollateralReportFiles}
    onEdit={editLoanReport}
  />
)

export default EditLoanReportPage

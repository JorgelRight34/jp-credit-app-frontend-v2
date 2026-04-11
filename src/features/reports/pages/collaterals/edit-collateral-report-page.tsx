import {
  deleteCollateralReportFiles,
  editCollateralReport,
  PropsWithReport,
  uploadCollateralReportFiles,
} from '@/features/reports'
import EditReportPageLayout from '../../layouts/edit-report-page-layout'
import { collateralsBreadcrumb } from '@/features/collaterals'
import { collateralTemplateDefinition } from '../../lib/templates/collateral-template-definition'

const EditCollateralReportPage = ({ report }: PropsWithReport) => (
  <EditReportPageLayout
    breadcrumb={collateralsBreadcrumb}
    report={report}
    templateDefinition={collateralTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onDelete={deleteCollateralReportFiles}
    onEdit={editCollateralReport}
  />
)

export default EditCollateralReportPage

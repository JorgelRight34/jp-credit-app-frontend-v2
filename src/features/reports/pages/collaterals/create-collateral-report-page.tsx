import {
  createCollateralReport,
  deleteCollateralReportFiles,
  uploadCollateralReportFiles,
} from '../../services/reportsClient'
import CreateReportPageLayout from '../../layouts/create-report-page-layout'
import {
  collateralReportsPermissionProvider,
  collateralsBreadcrumb,
} from '@/features/collaterals'
import { collateralTemplateDefinition } from '../../lib/templates/collateral-template-definition'

const CreateCollateralReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={collateralsBreadcrumb}
    permissionProvider={collateralReportsPermissionProvider}
    templateDefinition={collateralTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onDelete={deleteCollateralReportFiles}
    onSubmit={createCollateralReport}
  />
)

export default CreateCollateralReportPage

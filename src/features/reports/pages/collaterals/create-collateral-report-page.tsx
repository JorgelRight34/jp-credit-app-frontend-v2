import {
  createCollateralReport,
  uploadCollateralReportFiles,
} from '../../services/reportsClient'
import CreateReportPageLayout from '../../layouts/create-report-page-layout'
import { collateralsBreadcrumb } from '@/features/collaterals'
import { collateralTemplateDefinition } from '../../lib/templates/collateral-template-definition'

const CreateCollateralReportPage = () => (
  <CreateReportPageLayout
    breadcrumb={collateralsBreadcrumb}
    templateDefinition={collateralTemplateDefinition}
    onUpload={uploadCollateralReportFiles}
    onSubmit={createCollateralReport}
  />
)

export default CreateCollateralReportPage

import { generateCollateralReport } from '../../services/reportsClient'
import GenerateReportPageLayout from '../../layouts/generate-report-page-layout'
import { collateralTemplateDefinition } from '../../lib/templates/collateral-template-definition'
import {
  collateralsBreadcrumb,
  CollateralSearchInput,
} from '@/features/collaterals'

const GenerateCollateralReportPage = () => (
  <GenerateReportPageLayout
    breadcrumb={collateralsBreadcrumb}
    templateDefinition={collateralTemplateDefinition}
    searchInput={CollateralSearchInput}
    onSubmit={generateCollateralReport}
  />
)

export default GenerateCollateralReportPage

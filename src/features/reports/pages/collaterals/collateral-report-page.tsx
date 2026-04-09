import { generateCollateralReport } from '../../services/reportsClient'
import ReportPageLayout, {
  ReportPageProps,
} from '../../layouts/report-page-layout'
import { collateralTemplateDefinition } from '../../lib/templates/collateral-template-definition'
import {
  collateralsBreadcrumb,
  CollateralSearchInput,
} from '@/features/collaterals'

const CollateralReportPage = ({ report }: ReportPageProps) => (
  <ReportPageLayout
    breadcrumb={collateralsBreadcrumb}
    templateDefinition={collateralTemplateDefinition}
    editRoute="/collaterals/reports/$id"
    report={report}
    searchInput={CollateralSearchInput}
    onSubmit={generateCollateralReport}
  />
)

export default CollateralReportPage

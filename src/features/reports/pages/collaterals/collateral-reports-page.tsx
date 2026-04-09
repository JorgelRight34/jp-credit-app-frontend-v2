import { collateralsBreadcrumb } from '@/features/collaterals'
import {
  getCollateralsReport,
  ReportsDataTable,
  ReportsPageLayout,
} from '@/features/reports'

const CollateralReportsPage = () => (
  <ReportsPageLayout
    title="Reportes"
    createRoute="/loans/reports/create"
    generateRoute="/loans/reports/generate"
    breadcrumb={collateralsBreadcrumb}
  >
    <ReportsDataTable
      reportPageRoute="/loans/reports/$id"
      loader={getCollateralsReport}
    />
  </ReportsPageLayout>
)

export default CollateralReportsPage

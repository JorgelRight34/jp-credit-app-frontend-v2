import { loanModuleBreadcrumb } from '@/features/loans'
import {
  getLoanReports,
  ReportsDataTable,
  ReportsPageLayout,
} from '@/features/reports'

const LoanReportsPage = () => (
  <ReportsPageLayout
    title="Reportes"
    createRoute="/loans/reports/create"
    generateRoute="/loans/reports/generate"
    breadcrumb={loanModuleBreadcrumb}
  >
    <ReportsDataTable
      reportPageRoute="/loans/reports/$id"
      loader={getLoanReports}
    />
  </ReportsPageLayout>
)

export default LoanReportsPage

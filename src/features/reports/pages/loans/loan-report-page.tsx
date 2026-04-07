import { loanModuleBreadcrumb } from '@/features/loans'
import ReportPageLayout, {
  ReportPageProps,
} from '../../components/report-page-layout'

const LoanReportPage = ({ report }: ReportPageProps) => (
  <ReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    editRoute="/loans/reports/$id"
    report={report}
  />
)

export default LoanReportPage

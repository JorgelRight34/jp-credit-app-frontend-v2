import { loanModuleBreadcrumb, LoanSearchInput } from '@/features/loans'
import { loanTemplateDefinition } from '../../lib/templates/loan-template-definition'
import { generateLoanReport } from '../../services/reportsClient'
import ReportPageLayout, {
  ReportPageProps,
} from '../../layouts/report-page-layout'

const LoanReportPage = ({ report }: ReportPageProps) => (
  <ReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    templateDefinition={loanTemplateDefinition}
    editRoute="/loans/reports/$id"
    report={report}
    searchInput={LoanSearchInput}
    onSubmit={generateLoanReport}
  />
)

export default LoanReportPage

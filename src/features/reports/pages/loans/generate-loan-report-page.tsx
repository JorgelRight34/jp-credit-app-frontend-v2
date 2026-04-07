import { loanModuleBreadcrumb, LoanSearchInput } from '@/features/loans'
import { generateLoanReport } from '../../services/reportsClient'
import { loanTemplateDefinition } from '../../lib/templates/loan-template-definition'
import GenerateReportPageLayout from '../../layouts/generate-report-page-layout'

const GenerateLoanReportPage = () => (
  <GenerateReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    templateDefinition={loanTemplateDefinition}
    searchInput={LoanSearchInput}
    onSubmit={generateLoanReport}
  />
)

export default GenerateLoanReportPage

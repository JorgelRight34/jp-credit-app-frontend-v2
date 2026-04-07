import { loanModuleBreadcrumb } from '@/features/loans'
import GenerateReportPageLayout from '../../components/generate-report-page-layout'

const GenerateLoanReportPage = () => (
  <GenerateReportPageLayout
    breadcrumb={loanModuleBreadcrumb}
    reportKey="Loan"
  />
)

export default GenerateLoanReportPage

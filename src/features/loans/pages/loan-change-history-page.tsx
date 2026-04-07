import {
  ChangeHistoryDataTable,
  ChangeHistoryPageLayout,
} from '@/features/audit'
import { loanModuleBreadcrumb } from './loans-page'
import { buildLoanBreadcrumb } from './loan-page'
import { PropsWithLoan } from '../models/loan'
import { buildLoanChangeHistoryKey } from '../lib/query-keys'
import { getLoanHistory } from '../services/loanClient'
import { buildLoanLabel } from '../lib/utils'

const LoanChangeHistoryPage = ({ loan, ...props }: PropsWithLoan) => {
  const loanId = loan.id

  return (
    <ChangeHistoryPageLayout
      title={buildLoanLabel(loan)}
      breadcrumbs={[loanModuleBreadcrumb, buildLoanBreadcrumb(loan)]}
      {...props}
    >
      <ChangeHistoryDataTable
        cacheKey={buildLoanChangeHistoryKey(loanId)}
        loader={(q) => getLoanHistory(loanId, q)}
      />
    </ChangeHistoryPageLayout>
  )
}

export default LoanChangeHistoryPage

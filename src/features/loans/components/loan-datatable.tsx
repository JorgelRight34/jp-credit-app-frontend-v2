import { loanSearchConfig } from '../lib/config/loan-search-config'
import { loanDataTableConfig } from '../lib/config/loan-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Loan } from '../models/loan'
import type { LoanQuery } from '../models/loanQuery'
import { DataTableContainer } from '@/components'
import { loansQueryKey } from '../lib/constants'

const LoanDataTable = (props: DataTableContainerOverrides<Loan, LoanQuery>) => {
  return (
    <DataTableContainer
      searchConfig={loanSearchConfig}
      datatableConfig={loanDataTableConfig}
      cacheKey={[loansQueryKey, 'projects']}
      {...props}
    />
  )
}

export default LoanDataTable

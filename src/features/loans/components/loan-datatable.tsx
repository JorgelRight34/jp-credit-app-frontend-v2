import { loanSearchConfig } from '../lib/config/loan-search-config'
import { loanDataTableConfig } from '../lib/config/loan-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Loan } from '../models/loan'
import type { LoanQuery } from '../models/loanQuery'
import { DataTableContainer } from '@/components'

const LoanDataTable = (props: DataTableContainerOverrides<Loan, LoanQuery>) => {
  return (
    <DataTableContainer
      searchConfig={loanSearchConfig}
      datatableConfig={loanDataTableConfig}
      {...props}
    />
  )
}

export default LoanDataTable

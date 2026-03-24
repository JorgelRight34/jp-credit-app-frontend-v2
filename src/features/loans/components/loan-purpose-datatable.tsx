import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { LoanPurpose } from '../models/loanPurpose'
import { LoanPurposeQuery } from '../models/loanPurposeQuery'
import { loanPurposeSearchConfig } from '../lib/config/loan-purpose-search-config'
import { loanPurposeDataTableConfig } from '../lib/config/loan-purpose-datatable-config'
import { loanPurposesQueryKey, loansQueryKey } from '../lib/query-keys'

const LoanPurposeDataTable = (
  props: DataTableContainerOverrides<LoanPurpose, LoanPurposeQuery>,
) => (
  <DataTableContainer
    searchConfig={loanPurposeSearchConfig}
    datatableConfig={loanPurposeDataTableConfig}
    cacheKey={[loansQueryKey, loanPurposesQueryKey]}
    {...props}
  />
)

export default LoanPurposeDataTable

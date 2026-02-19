import { loanSearchConfig } from '../lib/config/loan-search-config'
import { loanDataTableConfig } from '../lib/config/loan-datatable-config'
import type { DataTableContainerOverrides } from '@/components'
import type { Loan } from '../models/loan'
import type { LoanQuery } from '../models/loanQuery'
import { DataTableContainer } from '@/components'
import { useProjectId } from '@/features/projects'
import { loansQueryKey } from '../lib/constants'

const LoanDataTable = (props: DataTableContainerOverrides<Loan, LoanQuery>) => {
  const [projectId] = useProjectId()

  return (
    <DataTableContainer
      searchConfig={loanSearchConfig}
      datatableConfig={loanDataTableConfig}
      cacheKey={[loansQueryKey, 'projects', projectId]}
      {...props}
    />
  )
}

export default LoanDataTable

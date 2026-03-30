import {
  DataTableContainerOverrides,
  DataTableContainerWithGuard,
} from '@/components'
import { AccountStatementQuery } from '../models/accountStatementQuery'
import { guarantorAccountStatementSearchConfig } from '../lib/config/account-statement-search-config'
import { accountStatementsQueryKey } from '../lib/query-keys'
import { guarantorAccountStatementDataTableConfig } from '../lib/config/guarantor-account-statement-datatable-config'
import { Loan } from '@/features/loans'

const GuarantorAccountStatementsDataTable = (
  props: DataTableContainerOverrides<Loan, AccountStatementQuery>,
) => {
  return (
    <DataTableContainerWithGuard
      shouldRender={(q) => !!q.profileId}
      fallback={() => 'Debe elegir un préstamo'}
      searchConfig={guarantorAccountStatementSearchConfig}
      datatableConfig={guarantorAccountStatementDataTableConfig}
      initialQuery={{ profileAs: 'guarantor' }}
      cacheKey={[accountStatementsQueryKey, 2]}
      {...props}
    />
  )
}

export default GuarantorAccountStatementsDataTable

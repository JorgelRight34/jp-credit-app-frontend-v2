import {
  DataTableContainerOverrides,
  DataTableContainerWithGuard,
} from '@/components'
import { AccountStatementQuery } from '../models/accountStatementQuery'
import { clientAccountStatementSearchConfig } from '../lib/config/account-statement-search-config'
import { accountStatementsQueryKey } from '../lib/query-keys'
import { clientAccountStatementDataTableConfig } from '../lib/config/client-account-statements-datatable-config'
import { Transaction } from '@/features/transactions'

const ClientAccountStatementsDataTable = (
  props: DataTableContainerOverrides<Transaction, AccountStatementQuery>,
) => {
  return (
    <DataTableContainerWithGuard
      shouldRender={(q) => !!q.loanId}
      fallback={() => 'Debe elegir un préstamo'}
      searchConfig={clientAccountStatementSearchConfig}
      datatableConfig={clientAccountStatementDataTableConfig}
      cacheKey={[accountStatementsQueryKey, 1]}
      {...props}
    />
  )
}

export default ClientAccountStatementsDataTable

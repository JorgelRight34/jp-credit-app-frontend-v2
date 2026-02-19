import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { TransactionQuery } from '../models/transactionQuery'
import { Transaction } from '../models/transaction'
import { transactionSearchConfig } from '../lib/config/transaction-search-config'
import { transactionDataTableConfig } from '../lib/config/transaction-datatable-config'
import { useProjectId } from '@/features/projects'
import { transactionsQueryKey } from '../lib/constants'

const TransactionDataTable = (
  props: DataTableContainerOverrides<Transaction, TransactionQuery>,
) => {
  const [projectId] = useProjectId()

  return (
    <DataTableContainer
      searchConfig={transactionSearchConfig}
      datatableConfig={transactionDataTableConfig}
      cacheKey={[transactionsQueryKey, 'project', projectId]}
      {...props}
    />
  )
}

export default TransactionDataTable

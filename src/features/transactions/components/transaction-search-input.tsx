import { transactionsQueryKey } from '../lib/constants'
import { DataPickerInputProps, Icon, PickerInputPanel } from '@/components'
import { DataTableContainer, LoanIcon, PickerInput } from '@/components'
import { DASHES } from '@/lib/utils'
import { Transaction } from '../models/transaction'
import { TransactionQuery } from '../models/transactionQuery'
import { transactionSearchConfig } from '../lib/config/transaction-search-config'
import { buildTransactionSearchInputTable } from '../lib/config/transaction-datatable-config'
import { getTransaction } from '../services/transactionClient'
import { buildTransactionLabel } from '../lib/utils'

const TransactionSearchInput = ({
  config,
  ...props
}: DataPickerInputProps<Transaction, TransactionQuery>) => {
  return (
    <PickerInput<Transaction, number>
      modalProps={{
        title: <Icon icon={LoanIcon}>Transacciones</Icon>,
      }}
      cacheKey={[transactionsQueryKey]}
      accesorFn={(l) => l?.id}
      visibleValueFn={(t) => (t ? buildTransactionLabel(t) : DASHES)}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={transactionSearchConfig}
            datatableConfig={buildTransactionSearchInputTable(setValue)}
            cacheKey={[transactionsQueryKey]}
            {...config}
          />
        </PickerInputPanel>
      )}
      loader={getTransaction}
      {...props}
    />
  )
}

export default TransactionSearchInput

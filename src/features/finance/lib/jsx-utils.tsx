import { DataTableBuilder, type Row } from '@/components'
import { dateToIsoString } from '@/lib/utils'
import { FinancialBreakdown } from '../models/financialBreakdown'
import {
  transactionDataTableConfig,
  TransactionType,
} from '@/features/transactions'
import { transactionsQueryKey } from '@/features/transactions/lib/constants'

export function buildFinanceTableOnExpand<T>(types: Array<TransactionType>) {
  return (row: Row<FinancialBreakdown<T>>) => (
    <div className="!max-h-[300px] w-full overflow-y-auto border border-red-500 !bg-white p-2">
      <DataTableBuilder
        config={transactionDataTableConfig}
        cacheKey={[transactionsQueryKey]}
        query={{
          startDate: dateToIsoString(row.original.start),
          endDate: dateToIsoString(row.original.end),
          types,
        }}
      />
    </div>
  )
}

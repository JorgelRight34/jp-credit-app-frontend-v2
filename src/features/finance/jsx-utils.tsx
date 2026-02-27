import { DataTableBuilder, type Row } from '@/components'
import { FinancialBreakdown } from './models/financialBreakdown'
import { transactionDataTableConfig, TransactionType } from '../transactions'
import { transactionsQueryKey } from '../transactions/lib/constants'
import { dateToIsoString } from '@/lib/utils'

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

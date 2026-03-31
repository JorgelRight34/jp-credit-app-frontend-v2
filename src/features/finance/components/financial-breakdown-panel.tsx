import { DataTable, useSearchFormValue } from '@/components'
import { FinanceQuery } from '../models/financeQuery'
import { transactionsQueryKey } from '@/features/transactions/lib/constants'
import { useData } from '@/hooks/useData'
import FinancialSummaryCards, {
  FinancialSummaryCardsLayout,
} from './financial-summary-cards'
import { buildFinancialBreakdownColumns } from '../lib/config/finance-datatable-config'
import { getFinancialBreakdownSummary } from '../services/financeService'
import { Transaction } from '@/features/transactions'
import { FinanceReport } from '../models/financeReport'

interface FinancialBreakdownPanelProps {
  loader: (query: FinanceQuery) => Promise<FinanceReport<Transaction>>
}

const FinancialBreakdownPanel = ({ loader }: FinancialBreakdownPanelProps) => {
  const query = useSearchFormValue<FinanceQuery>()

  return (
    <FinancialSummaryCardsLayout>
      <FinancialSummaryCardsLayout.Main>
        <DataTable
          columns={buildFinancialBreakdownColumns(
            query.endDate,
            query.interval,
          )}
          cacheKey={[
            transactionsQueryKey,
            query.type,
            'summaries',
            query.startDate,
            query.endDate,
          ]}
          query={query}
          loader={loader}
        />
      </FinancialSummaryCardsLayout.Main>
      <FinancialSummaryCardsLayout.Aside>
        <FinancialBreakdownSummaryCards query={query} />
      </FinancialSummaryCardsLayout.Aside>
    </FinancialSummaryCardsLayout>
  )
}

const FinancialBreakdownSummaryCards = ({ query }: { query: FinanceQuery }) => {
  const { data } = useData({
    key: [
      transactionsQueryKey,
      query.type,
      'summary',
      query.startDate,
      query.endDate,
    ],
    loader: () => getFinancialBreakdownSummary(query),
  })

  return (
    <FinancialSummaryCards
      capital={data?.capital ?? 0}
      interest={data?.interest ?? 0}
      fee={data?.fee ?? 0}
    />
  )
}

export default FinancialBreakdownPanel

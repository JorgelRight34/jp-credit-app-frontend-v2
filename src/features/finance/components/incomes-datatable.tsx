import {
  SearchFormContainer,
  SearchFormValueConsumer,
  TableBuilder,
} from '@/components'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import { buildFinancialBreakdownColumns } from '../lib/config/finance-datatable-config'
import { FinanceQuery } from '../models/financeQuery'
import { getIncomesPerInterval } from '../services/financeService'
import { transactionsQueryKey } from '@/features/transactions/lib/constants'
import { useData } from '@/hooks/useData'
import FinancialSummaryCards, {
  FinancialSummaryCardsLayout,
} from './financial-summary-cards'
import { incomeTableSearchConfig } from '../lib/config/income-config'

const IncomesDataTable = () => {
  return (
    <SearchFormContainer
      searchConfig={incomeTableSearchConfig}
      initialQuery={{
        option: 1,
        startDate: toInputDate(getTodayWithDaysFromNow(-30)),
        endDate: getTodayAsInputDate(),
        interval: 30,
      }}
    >
      <SearchFormValueConsumer<FinanceQuery>
        render={(query) => <IncomesTable query={query} />}
      />
    </SearchFormContainer>
  )
}

const IncomesTable = ({ query }: { query: FinanceQuery }) => {
  const { data } = useData({
    key: [transactionsQueryKey, 'expenses', { query }],
    loader: () => getIncomesPerInterval(query),
  })

  return (
    <FinancialSummaryCardsLayout>
      <FinancialSummaryCardsLayout.Main>
        <TableBuilder
          columns={buildFinancialBreakdownColumns(
            query.startDate,
            query.endDate,
            query.interval,
          )}
          data={data?.items}
        />
      </FinancialSummaryCardsLayout.Main>
      <FinancialSummaryCardsLayout.Aside>
        <FinancialSummaryCards
          capital={data?.summary.capital ?? 0}
          interest={data?.summary?.interest ?? 0}
          fee={data?.summary?.fee ?? 0}
        />
      </FinancialSummaryCardsLayout.Aside>
    </FinancialSummaryCardsLayout>
  )
}

export default IncomesDataTable

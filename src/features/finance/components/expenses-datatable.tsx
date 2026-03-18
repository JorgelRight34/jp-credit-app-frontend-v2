import {
  PropsWithInitialQuery,
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
import { getExpensesPerInterval } from '../services/financeService'
import { transactionsQueryKey } from '@/features/transactions/lib/constants'
import { useData } from '@/hooks/useData'
import FinancialSummaryCards, {
  FinancialSummaryCardsLayout,
} from './financial-summary-cards'
import { expenseTableSearchConfig } from '../lib/config/expense-config'

const ExpensesDataTable = ({
  initialQuery,
}: PropsWithInitialQuery<FinanceQuery>) => {
  return (
    <SearchFormContainer
      searchConfig={expenseTableSearchConfig}
      initialQuery={{
        option: 1,
        startDate: toInputDate(getTodayWithDaysFromNow(-30)),
        endDate: getTodayAsInputDate(),
        interval: 30,
        ...initialQuery,
      }}
    >
      <SearchFormValueConsumer<FinanceQuery>
        render={(query) => <ExpensesTable query={query} />}
      />
    </SearchFormContainer>
  )
}

const ExpensesTable = ({ query }: { query: FinanceQuery }) => {
  const { data } = useData({
    key: [transactionsQueryKey, 'expenses', { query }],
    loader: () => getExpensesPerInterval(query),
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
          interest={data?.summary.interest ?? 0}
          fee={data?.summary.fee ?? 0}
        />
      </FinancialSummaryCardsLayout.Aside>
    </FinancialSummaryCardsLayout>
  )
}

export default ExpensesDataTable

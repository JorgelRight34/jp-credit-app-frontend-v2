import { PropsWithInitialQuery, SearchFormContainer } from '@/components'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import { FinanceQuery } from '../models/financeQuery'
import { getExpensesPerInterval } from '../services/financeService'
import { expenseTableSearchConfig } from '../lib/config/expense-config'
import FinancialBreakdownPanel from './financial-breakdown-panel'

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
        type: 'ds',
        ...initialQuery,
      }}
    >
      <FinancialBreakdownPanel loader={getExpensesPerInterval} />
    </SearchFormContainer>
  )
}

export default ExpensesDataTable

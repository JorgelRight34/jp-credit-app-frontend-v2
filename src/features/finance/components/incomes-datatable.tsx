import { PropsWithInitialQuery, SearchFormContainer } from '@/components'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import { FinanceQuery } from '../models/financeQuery'
import { getIncomesPerInterval } from '../services/financeService'
import { incomeTableSearchConfig } from '../lib/config/income-config'
import FinancialBreakdownPanel from './financial-breakdown-panel'

const IncomesDataTable = ({
  initialQuery,
}: PropsWithInitialQuery<FinanceQuery>) => {
  return (
    <SearchFormContainer
      searchConfig={incomeTableSearchConfig}
      initialQuery={{
        option: 1,
        startDate: toInputDate(getTodayWithDaysFromNow(-30 * 12 * 10)),
        endDate: getTodayAsInputDate(),
        interval: 30,
        type: 'pc',
        ...initialQuery,
      }}
    >
      <FinancialBreakdownPanel loader={getIncomesPerInterval} />
    </SearchFormContainer>
  )
}

export default IncomesDataTable

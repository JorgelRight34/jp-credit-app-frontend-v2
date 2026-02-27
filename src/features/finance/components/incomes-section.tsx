import { SearchFormContainer, TableWithDataLoaderBuilder } from '@/components'
import FinanceSectionLayout from '../layouts/finance-section-layout'
import { financeSearchConfig } from '../lib/config/finance-search-config'
import { incomeTableColumns } from '../lib/config/finance-datatable-config'
import { getIncomesPerInterval } from '../services/financeService'
import { FinanceQuery } from '../models/financeQuery'
import { buildFinanceTableOnExpand } from '../jsx-utils'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'

const getIncomes = async (query: FinanceQuery) => {
  const data = await getIncomesPerInterval(query)
  return data.items
}

const IncomesSection = () => {
  return (
    <FinanceSectionLayout>
      <SearchFormContainer
        searchConfig={financeSearchConfig}
        initialQuery={{
          startDate: getTodayAsInputDate(),
          endDate: toInputDate(getTodayWithDaysFromNow(-30)),
          interval: 30,
          scale: '',
        }}
        render={(query) => (
          <TableWithDataLoaderBuilder
            cacheKey={[{ query }]}
            columns={incomeTableColumns}
            loader={() => getIncomes(query)}
            onExpand={buildFinanceTableOnExpand(['pc', 'pg'])}
          />
        )}
      />
    </FinanceSectionLayout>
  )
}

export default IncomesSection

import {
  SearchFormContainer,
  SearchFormValueConsumer,
  Tab,
  TableWithDataLoaderBuilder,
  Tabs,
  TrendingUpIcon,
} from '@/components'
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
    <SearchFormContainer
      searchConfig={financeSearchConfig}
      initialQuery={{
        startDate: getTodayAsInputDate(),
        endDate: toInputDate(getTodayWithDaysFromNow(-30)),
        interval: 30,
        scale: '',
      }}
    >
      <Tabs variation="minimal" defaultActiveKey="table">
        <Tab eventKey="table" title="Tabla">
          <SearchFormValueConsumer<FinanceQuery>
            render={(query) => (
              <TableWithDataLoaderBuilder
                cacheKey={[{ query }]}
                columns={incomeTableColumns}
                loader={() => getIncomes(query)}
                onExpand={buildFinanceTableOnExpand(['pc', 'pg'])}
              />
            )}
          />
        </Tab>
        <Tab eventKey="chart" title="Grafica" icon={TrendingUpIcon}></Tab>
      </Tabs>
    </SearchFormContainer>
  )
}

export default IncomesSection

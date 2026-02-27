import {
  SearchFormContainer,
  SearchFormValueConsumer,
  Tab,
  TableWithDataLoaderBuilder,
  Tabs,
  TrendingUpIcon,
} from '@/components'
import { financeSearchConfig } from '../lib/config/finance-search-config'
import { getIncomesPerInterval } from '../services/financeService'
import { FinanceQuery } from '../models/financeQuery'
import { buildFinanceTableOnExpand } from '../jsx-utils'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import { buildFinancialBreakdownColumns } from '../lib/config/finance-datatable-config'

const getIncomes = async (query: FinanceQuery) => {
  const data = await getIncomesPerInterval(query)
  return data.items
}

const IncomesSection = () => {
  return (
    <SearchFormContainer
      searchConfig={financeSearchConfig}
      initialQuery={{
        startDate: toInputDate(getTodayWithDaysFromNow(-30)),
        endDate: getTodayAsInputDate(),
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
                columns={buildFinancialBreakdownColumns(
                  query.startDate,
                  query.endDate,
                  query.interval,
                )}
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

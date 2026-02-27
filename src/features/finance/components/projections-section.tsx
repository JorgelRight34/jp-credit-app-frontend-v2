import {
  GroupedTable,
  SearchFormContainer,
  SearchFormValueConsumer,
  Tab,
  Tabs,
  TrendingUpIcon,
} from '@/components'
import { financeSearchConfig } from '../lib/config/finance-search-config'
import { FinanceQuery } from '../models/financeQuery'
import {
  getTodayAsInputDate,
  getTodayWithDaysFromNow,
  toInputDate,
} from '@/lib/utils'
import { useGroupedProjections } from '../hooks/useGroupedProjections'
import { buildProjectionTableColumns } from '../lib/config/finance-datatable-config'

const ProjectionsSection = () => {
  return (
    <SearchFormContainer
      searchConfig={financeSearchConfig}
      initialQuery={{
        startDate: getTodayAsInputDate(),
        endDate: toInputDate(getTodayWithDaysFromNow(30)),
        interval: 30,
        scale: '',
      }}
    >
      <Tabs variation="minimal" defaultActiveKey="table">
        <Tab eventKey="table" title="Tabla">
          <SearchFormValueConsumer<FinanceQuery>
            render={(query) => <ProjectionsGroupedTable query={query} />}
          />
        </Tab>
        <Tab eventKey="chart" title="Grafica" icon={TrendingUpIcon}></Tab>
      </Tabs>
    </SearchFormContainer>
  )
}

const ProjectionsGroupedTable = ({ query }: { query: FinanceQuery }) => {
  const { projections, period, periods, ...table } = useGroupedProjections({
    query,
    periodsOfMargin: 0,
  })

  return (
    <GroupedTable
      groupPageSize={10}
      columns={buildProjectionTableColumns(
        projections?.loansMap,
        period?.start,
        period?.end,
        query.interval,
      )}
      totalItems={periods.length}
      {...table}
    />
  )
}

export default ProjectionsSection

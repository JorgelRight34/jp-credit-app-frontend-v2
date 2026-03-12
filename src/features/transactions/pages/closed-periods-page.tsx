import {
  AllIcon,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import ClosedPeriodDataTable from '../components/closed-period-datatable'
import { transactionBreadcrumb } from './transactions-page'
import { closedPeriodsBreadcrumb } from './create-closed-period-page'

const periodsBreadcrumb: Array<BreadcrumbSpec> = [
  transactionBreadcrumb,
  closedPeriodsBreadcrumb,
  { title: 'Todos', icon: AllIcon },
]

const ClosedPeriodsPage = () => {
  return (
    <PageLayout
      title="Transacciones / Periodos Contables"
      breadcrumb={<PageLayoutBreadcrumb breadcrumbs={periodsBreadcrumb} />}
      options={[buildPageLayoutCreateOption('/transactions/periods/create')]}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Todos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <ClosedPeriodDataTable />
        </TabPanel>
      </Tabs>
    </PageLayout>
  )
}

export default ClosedPeriodsPage

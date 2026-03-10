import {
  AllIcon,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabList,
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
      <TabList>
        <Tab title="Todos" isActive />
      </TabList>
      <ClosedPeriodDataTable />
    </PageLayout>
  )
}

export default ClosedPeriodsPage

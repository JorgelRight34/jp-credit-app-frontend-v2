import {
  AllIcon,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  PageLayout,
  PageLayoutBreadcrumb,
  ScheduleIcon,
  Tab,
  TabList,
} from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import ClosedPeriodDataTable from '../components/closed-period-datatable'
import { transactionBreadcrumb } from '../lib/config/breadcrumb'

const periodsBreadcrumb: Array<BreadcrumbSpec> = [
  transactionBreadcrumb,
  {
    title: 'Periodos contables',
    icon: ScheduleIcon,
  },
  { title: 'Todos', icon: AllIcon },
]

const ClosedPeriodsPage = () => {
  return (
    <PageLayout
      title="Transacciones / Periodos Contables"
      breadcrumb={<PageLayoutBreadcrumb breadcrumbs={periodsBreadcrumb} />}
      options={[buildPageLayoutCreateOption('/transactions/periods/create')]}
      permissionProvider={transactionPermissionProvider}
    >
      <TabList>
        <Tab title="Todos" isActive />
      </TabList>
      <ClosedPeriodDataTable />
    </PageLayout>
  )
}

export default ClosedPeriodsPage

import {
  AllIcon,
  BreadcrumbsByRoute,
  createPageLayoutCreateOption,
  DisbursementIcon,
  PageRouterLayout,
  PaymentIcon,
  ScheduleIcon,
  Tab,
  TabsRouter,
} from '@/components'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import { transactionBreadcrumb } from '../lib/config/breadcrumb'
import TransactionDataTable from '../components/transaction-datatable'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: { title: 'Todos', icon: AllIcon },
  payments: { title: 'Pagos', icon: PaymentIcon },
  disbursements: { title: 'Desembolsos', icon: DisbursementIcon },
  overdue: { title: 'Atrasados', icon: ScheduleIcon },
}

const TransactionsPage = () => {
  return (
    <PageRouterLayout
      title="Transacciones"
      options={[createPageLayoutCreateOption('/transactions/create')]}
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [transactionBreadcrumb],
        breadcrumbsByRoute,
      }}
      permissionProvider={transactionPermissionProvider}
    >
      <TabsRouter>
        <Tab eventKey="all" title="Todos">
          <TransactionDataTable />
        </Tab>
        <Tab eventKey="payments" title="Pagos">
          <TransactionDataTable initialQuery={{ type: 'pc' }} />
        </Tab>
        <Tab eventKey="disbursements" title="Desembolsos">
          <TransactionDataTable initialQuery={{ type: 'ds' }} />
        </Tab>
        <Tab eventKey="overdue" title="Atrasados">
          <TransactionDataTable initialQuery={{ isOverdue: true }} />
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default TransactionsPage

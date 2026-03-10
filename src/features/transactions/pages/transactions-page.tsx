import {
  AllIcon,
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildPageLayoutCreateOption,
  DisbursementIcon,
  PageRouterLayout,
  PaymentIcon,
  ScheduleIcon,
  Tab,
  TabsRouter,
  TransactionIcon,
} from '@/components'
import TransactionDataTable from '../components/transaction-datatable'

export const transactionBreadcrumb: BreadcrumbSpec = {
  icon: TransactionIcon,
  title: 'Transacciones',
  pathname: '/transactions',
}

export const paymentsBreadcrumb: BreadcrumbSpec = {
  title: 'Pagos',
  icon: PaymentIcon,
}

export const disbursementsBreadcrumb: BreadcrumbSpec = {
  title: 'Desembolsos',
  icon: DisbursementIcon,
}

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  all: [{ title: 'Todos', icon: AllIcon }],
  payments: [paymentsBreadcrumb],
  disbursements: [disbursementsBreadcrumb],
  overdue: [{ title: 'Atrasados', icon: ScheduleIcon }],
}

const TransactionsPage = () => {
  return (
    <PageRouterLayout
      title="Transacciones"
      options={[buildPageLayoutCreateOption('/transactions/create')]}
      routerConfig={{
        defaultActive: 'all',
        baseBreadcrumbs: [transactionBreadcrumb],
        breadcrumbsByRoute,
      }}
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

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
  TabPanel,
  TabsList,
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

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [{ title: 'Todos', icon: AllIcon }],
  [paymentsBreadcrumb],
  [disbursementsBreadcrumb],
  [{ title: 'Atrasados', icon: ScheduleIcon }],
]

const TransactionsPage = () => {
  return (
    <PageRouterLayout
      title="Transacciones"
      options={[buildPageLayoutCreateOption('/transactions/create')]}
      routerConfig={{
        baseBreadcrumbs: [transactionBreadcrumb],
        breadcrumbsByRoute,
      }}
    >
      <TabsRouter>
        <TabsList>
          <Tab index={0}>Todos</Tab>
          <Tab index={1}>Pagos</Tab>
          <Tab index={2}>Desembolsos</Tab>
          <Tab index={3}>Atrasados</Tab>
        </TabsList>
        <TabPanel index={0}>
          <TransactionDataTable />
        </TabPanel>
        <TabPanel index={2}>
          <TransactionDataTable initialQuery={{ type: 'pc' }} />
        </TabPanel>
        <TabPanel index={3}>
          <TransactionDataTable initialQuery={{ type: 'ds' }} />
        </TabPanel>
        <TabPanel index={4}>
          <TransactionDataTable initialQuery={{ isOverdue: true }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default TransactionsPage

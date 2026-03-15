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
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { SMALL_SCREEN_BREAKPOINT } from '@/lib/utils'

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
  const isSmall = useMediaQuery(SMALL_SCREEN_BREAKPOINT)

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
          <button
            className="text-secondary"
            onClick={() => {
              console.log(`Current width: ${window.innerWidth}`)
              console.log(
                `So isSmall = ${window.innerWidth} < ${SMALL_SCREEN_BREAKPOINT} = ${isSmall}`,
              )
            }}
          >
            inner width {isSmall ? 'true' : 'false'}
          </button>
        </TabsList>
        <TabPanel index={0}>
          <TransactionDataTable />
        </TabPanel>
        <TabPanel index={1}>
          <TransactionDataTable initialQuery={{ type: 'pc' }} />
        </TabPanel>
        <TabPanel index={2}>
          <TransactionDataTable initialQuery={{ type: 'ds' }} />
        </TabPanel>
        <TabPanel index={3}>
          <TransactionDataTable initialQuery={{ isOverdue: true }} />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default TransactionsPage

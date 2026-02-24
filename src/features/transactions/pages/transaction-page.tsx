import {
  BreadcrumbsByRoute,
  buildPageLayoutMenuOption,
  PageRouterLayout,
  Tab,
  TabsRouter,
} from '@/components'
import { Transaction } from '../models/transaction'
import { buildTransactionLabel } from '../lib/utils'
import { transactionPermissionProvider } from '../lib/config/permission-provider'
import {
  buildTransactionBreadcrumb,
  transactionBreadcrumb,
} from '../lib/config/breadcrumb'
import { overviewBreadcrumb } from '@/lib/constants'
import TransactionOverview from '../components/transaction-overview'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
}

const TransactionPage = ({ transaction }: { transaction: Transaction }) => {
  return (
    <PageRouterLayout
      title={buildTransactionLabel(transaction)}
      routerConfig={{
        defaultActive: 'overview',
        baseBreadcrumbs: [
          transactionBreadcrumb,
          buildTransactionBreadcrumb(transaction),
        ],
        breadcrumbsByRoute,
      }}
      options={[buildPageLayoutMenuOption([{ label: 'Eliminar' }])]}
      permissionProvider={transactionPermissionProvider}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
          <TransactionOverview transaction={transaction} />
        </Tab>
        <Tab eventKey="receipt" title="Comprobante">
          ...
        </Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default TransactionPage

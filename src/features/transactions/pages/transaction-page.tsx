import {
  BreadcrumbsByRoute,
  buildConfirmationModalTrigger,
  buildPageLayoutMenuOption,
  CheckCircleIcon,
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
import { deleteTransaction } from '../services/transactionClient'

const breadcrumbsByRoute: BreadcrumbsByRoute = {
  overview: [overviewBreadcrumb],
  receipt: [{ title: 'Comprobante', icon: CheckCircleIcon }],
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
      options={[
        buildPageLayoutMenuOption([
          {
            label: 'Eliminar',
            disabled: transaction.isClosed,
            tooltip: 'No puede editar una transaccion cerrada',
            as: buildConfirmationModalTrigger({
              onConfirm: () =>
                deleteTransaction(transaction.id, transaction.type),
              title: 'Eliminar transacción',
              description:
                'Esta acción eliminará permanentemente la transacción seleccionada.',
              confirmationMessage:
                '¿Está seguro de que desea eliminar esta transacción?',
            }),
          },
        ]),
      ]}
      permissionProvider={transactionPermissionProvider}
    >
      <TabsRouter>
        <Tab eventKey="overview" title="Resumen">
          <TransactionOverview transaction={transaction} />
        </Tab>
        <Tab eventKey="receipt" title="Comprobante"></Tab>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default TransactionPage

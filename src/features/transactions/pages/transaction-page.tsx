import {
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildConfirmationModalTrigger,
  buildPageLayoutMenuOption,
  CheckCircleIcon,
  PageRouterLayout,
  Tab,
  TabsRouter,
  TransactionIcon,
} from '@/components'
import { Transaction } from '../models/transaction'
import { buildTransactionLabel } from '../lib/utils'
import { overviewBreadcrumb } from '@/lib/constants'
import TransactionOverview from '../components/transaction-overview'
import { deleteTransaction } from '../services/transactionClient'
import { transactionBreadcrumb } from './transactions-page'

export const buildTransactionBreadcrumb = (
  transaction: Transaction,
): BreadcrumbSpec => ({
  title: buildTransactionLabel(transaction),
  icon: TransactionIcon,
  pathname: '/transactions/$id',
  params: { id: transaction.id.toString() },
})

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

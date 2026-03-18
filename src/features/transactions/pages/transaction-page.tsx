import {
  BreadcrumbsByRoute,
  BreadcrumbSpec,
  buildConfirmationModalTrigger,
  buildPageLayoutMenuOption,
  CheckCircleIcon,
  PageRouterLayout,
  Tab,
  TabPanel,
  TabsList,
  TabsRouter,
  TransactionIcon,
} from '@/components'
import { Transaction } from '../models/transaction'
import { buildTransactionLabel } from '../lib/utils'
import { overviewBreadcrumb } from '@/lib/constants'
import TransactionOverview from '../components/transaction-overview'
import { deleteTransaction } from '../services/transactionClient'
import { transactionBreadcrumb } from './transactions-page'
import GenerateTransactionReceiptPanel from '../components/generate-transaction-receipt-panel'

export const buildTransactionBreadcrumb = (
  transaction: Transaction,
): BreadcrumbSpec => ({
  title: buildTransactionLabel(transaction),
  icon: TransactionIcon,
  pathname: '/transactions/$id',
  params: { id: transaction.id.toString() },
})

const breadcrumbsByRoute: BreadcrumbsByRoute = [
  [overviewBreadcrumb],
  [{ title: 'Comprobante', icon: CheckCircleIcon }],
]

const TransactionPage = ({ transaction }: { transaction: Transaction }) => {
  return (
    <PageRouterLayout
      title={buildTransactionLabel(transaction)}
      routerConfig={{
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
        <TabsList>
          <Tab index={0}>Resumen</Tab>
          <Tab index={1}>Comprobante</Tab>
        </TabsList>
        <TabPanel index={0}>
          <TransactionOverview transaction={transaction} />
        </TabPanel>
        <TabPanel index={1}>
          <GenerateTransactionReceiptPanel
            id={transaction.id}
            type={transaction.type}
          />
        </TabPanel>
      </TabsRouter>
    </PageRouterLayout>
  )
}

export default TransactionPage

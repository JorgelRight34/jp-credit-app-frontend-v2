import { DeleteFormPageLayout } from '@/components'
import { PropsWithTransaction } from '../models/transaction'
import { buildTransactionLabel } from '../lib/utils'
import DeleteTransactionForm from '../components/delete-transaction-form'
import { transactionBreadcrumb } from './transactions-page'
import { buildTransactionBreadcrumb } from './transaction-page'

const DeleteTransactionPage = ({ transaction }: PropsWithTransaction) => (
  <DeleteFormPageLayout
    title={buildTransactionLabel(transaction)}
    breadcrumbs={[
      transactionBreadcrumb,
      buildTransactionBreadcrumb(transaction),
    ]}
  >
    <DeleteTransactionForm transaction={transaction} />
  </DeleteFormPageLayout>
)

export default DeleteTransactionPage

import { ConfirmationForm } from '@/components'
import { PropsWithTransaction } from '../models/transaction'
import { deleteTransaction } from '../services/transactionClient'

const DeleteTransactionForm = ({ transaction }: PropsWithTransaction) => (
  <ConfirmationForm
    confirmationMessage="Vayamos a borrarlo"
    onConfirm={() => deleteTransaction(transaction.id, transaction.type)}
  />
)

export default DeleteTransactionForm

import { ConfirmationForm } from '@/components'
import { PropsWithLoan } from '../models/loan'
import { deleteLoan } from '../services/loanClient'
import { loansQueryKey } from '../lib/query-keys'

const DeleteLoanForm = ({ loan }: PropsWithLoan) => (
  <ConfirmationForm
    confirmationMessage="Borrar"
    onConfirm={() => deleteLoan(loan.id)}
    cacheKey={[loansQueryKey]}
  />
)

export default DeleteLoanForm

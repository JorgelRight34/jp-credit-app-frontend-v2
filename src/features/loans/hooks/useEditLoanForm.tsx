import { UseDataFormProps, useForm } from '@/components'
import { Loan } from '../models/loan'
import {
  loanEditFormSchema,
  LoanEditFormValues,
} from '../lib/schemas/loanEditFormSchema'
import { editLoan } from '../services/loanClient'
import { loansQueryKey } from '../lib/query-keys'

interface UseEditLoanFormProps extends UseDataFormProps<
  void,
  LoanEditFormValues
> {
  loan: Loan
}

export const useEditLoanForm = ({ loan, ...props }: UseEditLoanFormProps) => {
  return useForm({
    schema: loanEditFormSchema,
    defaultValues: {
      description: loan.description,
      loanPurposeId: loan.loanPurposeId,
      penaltyRate: loan.penaltyRate,
    },
    onSubmit: (body) => editLoan(loan.id, body),
    keysToInvalidate: [[loansQueryKey]],
    ...props,
  })
}

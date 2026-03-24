import { UseDataFormProps, useForm } from '@/components'
import {
  loanSettingsFormSchema,
  LoanSettingsFormValues,
} from '../lib/schemas/loanSettingsFormSchema'
import { Loan } from '../models/loan'
import { updateLoanStatus } from '../services/loanClient'
import { LoanStatus } from '../models/loanStatus'
import { loansQueryKey } from '../lib/query-keys'

interface UseLoanStatusFormProps extends UseDataFormProps<
  null,
  LoanSettingsFormValues
> {
  loan: Loan
}

export const useLoanStatusForm = ({
  loan,
  ...props
}: UseLoanStatusFormProps) => {
  return useForm({
    schema: loanSettingsFormSchema,
    defaultValues: { status: loan.status.toString() },
    onSubmit: async (body) => {
      await updateLoanStatus(loan.id, body.status as LoanStatus)
      return null
    },
    resetValues: false,
    keysToInvalidate: [[loansQueryKey]],
    ...props,
  })
}

import { UseDataFormProps, useForm } from '@/components'
import { LoanPurpose } from '../models/loanPurpose'
import {
  loanPurposeFormSchema,
  LoanPurposeFormValues,
} from '../lib/schemas/loanPurposeFormSchema'
import { createLoanPurpose, editLoanPurpose } from '../services/loanClient'
import { loanPurposesQueryKey } from '../lib/query-keys'

interface UseLoanPurposeFormProps extends UseDataFormProps<
  LoanPurpose,
  LoanPurposeFormValues
> {
  id?: LoanPurpose['id']
}

export const useLoanPurposeForm = ({
  id,
  ...props
}: UseLoanPurposeFormProps) => {
  return useForm({
    schema: loanPurposeFormSchema,
    defaultValues: { name: '' },
    shouldEdit: !!id,
    onSubmit: createLoanPurpose,
    onEdit: (body) => editLoanPurpose(id!, body),
    keysToInvalidate: [[loanPurposesQueryKey]],
    ...props,
  })
}

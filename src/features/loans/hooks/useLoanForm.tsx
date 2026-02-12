import {
  DataModuleFormProps,
  useForm,
  UseFormBuilderReturn,
} from '@/components'
import { loanFormSchema, LoanFormValues } from '../lib/schemas/loanFormSchema'
import { Loan } from '../models/loan'
import { createLoan } from '../services/loanClient'

export const useLoanForm = ({
  initialValues,
  ...props
}: DataModuleFormProps<
  Loan,
  LoanFormValues
>): UseFormBuilderReturn<LoanFormValues> => {
  return useForm({
    schema: loanFormSchema,
    defaultValues: {
      approvedAmount: '',
      description: '',
      interestRate: '',
      numberOfPayments: '',
      paymentFrequency: '',
      startDate: '',
      deliveryDate: '',
      status: '',
      annualInterestRate: '',
    },
    onSubmit: createLoan,
    ...props,
  })
}

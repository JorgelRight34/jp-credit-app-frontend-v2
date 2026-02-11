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
      approvedAmount: 0,
      disbursedAmount: 0,
      description: '',
      interestRate: 0,
      numberOfPayments: 0,
      paymentFrequency: 0,
      startDate: '',
      deliveryDate: '',
      status: '',
      annualInterestRate: 0,
      ...initialValues,
    },
    onSubmit: createLoan,
    ...props,
  })
}

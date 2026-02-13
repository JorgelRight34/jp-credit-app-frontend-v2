import {
  DataModuleFormProps,
  useForm,
  UseFormBuilderReturn,
} from '@/components'
import { loanFormSchema, LoanFormValues } from '../lib/schemas/loanFormSchema'
import { Loan } from '../models/loan'
import { createLoan } from '../services/loanClient'
import { useSuspenseCurrentProject } from '@/features/projects'

export const useLoanForm = ({
  initialValues,
  ...props
}: DataModuleFormProps<
  Loan,
  LoanFormValues
>): UseFormBuilderReturn<LoanFormValues> => {
  const project = useSuspenseCurrentProject()

  return useForm({
    schema: loanFormSchema,
    defaultValues: {
      approvedAmount: '',
      description: '',
      numberOfPayments: '',
      paymentFrequency: '',
      startDate: '',
      deliveryDate: '',
      annualInterestRate: '',
      projectId: project!.id,
      graceDays: project?.graceDays,
    },
    onSubmit: createLoan,
    ...props,
  })
}

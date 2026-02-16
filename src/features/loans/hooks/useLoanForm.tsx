import {
  DataModuleFormProps,
  useForm,
  UseFormBuilderReturn,
} from '@/components'
import { loanFormSchema, LoanFormValues } from '../lib/schemas/loanFormSchema'
import { Loan } from '../models/loan'
import { createLoan } from '../services/loanClient'
import { Project } from '@/features/projects'

interface UseLoanFormProps extends DataModuleFormProps<Loan, LoanFormValues> {
  project: Project
}

export const useLoanForm = ({
  project,
  initialValues,
  ...props
}: UseLoanFormProps): UseFormBuilderReturn<LoanFormValues> => {
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
      projectId: project.id,
      graceDays: project.graceDays,
    },
    onSubmit: createLoan,
    ...props,
  })
}

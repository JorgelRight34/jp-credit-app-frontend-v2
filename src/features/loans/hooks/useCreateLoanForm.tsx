import { DataModuleFormProps, useForm } from '@/components'
import {
  loanCreateFormSchema,
  LoanCreateFormValues,
} from '../lib/schemas/loanCreateFormSchema'
import { Loan } from '../models/loan'
import { createLoan } from '../services/loanClient'
import { Project } from '@/features/projects'

interface UseCreateLoanFormProps extends DataModuleFormProps<
  Loan,
  LoanCreateFormValues
> {
  project: Project
}

export const useCreateLoanForm = ({
  project,
  defaultValues,
  ...props
}: UseCreateLoanFormProps) => {
  return useForm({
    schema: loanCreateFormSchema,
    defaultValues: {
      approvedAmount: '',
      annualInterestRate: '',
      startDate: '',
      deliveryDate: '',
      paymentFrequency: '',
      description: '',
      numberOfPayments: '',
      projectId: project.id,
      penaltyRate: project.defaultPenaltyRate,
      graceDays: project.graceDays,
      clientProfileId: null,
      guarantorProfileId: null,
      loanOfficerProfileId: null,
      ...defaultValues,
    },
    initialValues: { numberOfPayments: 5 },
    onSubmit: createLoan,
    ...props,
  })
}

import { DataModuleFormProps, useForm } from '@/components'
import { loanFormSchema, LoanFormValues } from '../lib/schemas/loanFormSchema'
import { Loan } from '../models/loan'
import { createLoan } from '../services/loanClient'
import { Project } from '@/features/projects'

interface UseLoanFormProps extends DataModuleFormProps<Loan, LoanFormValues> {
  project: Project
}

export const useLoanForm = ({
  project,
  defaultValues,
  ...props
}: UseLoanFormProps) => {
  return useForm({
    schema: loanFormSchema,
    defaultValues: {
      approvedAmount: '',
      annualInterestRate: '',
      startDate: '',
      deliveryDate: '',
      paymentFrequency: '',
      description: '',
      numberOfPayments: '',
      projectId: project.id,
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

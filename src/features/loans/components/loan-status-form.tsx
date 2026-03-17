import {
  ClosedProcessPanel,
  DataModuleFormProps,
  Form,
  FormContainer,
  FormInput,
  InputProps,
  Paragraph,
} from '@/components'
import { useLoanStatusForm } from '../hooks/useLoanStatusForm'
import { Loan } from '../models/loan'
import { LoanSettingsFormValues } from '../lib/schemas/loanSettingsFormSchema'
import LoanStatusCard from './loan-status-card'
import { LOAN_STATUS_CARD_OPTIONS } from '../lib/constants'

interface LoanStatusFormProps extends DataModuleFormProps<
  null,
  LoanSettingsFormValues
> {
  loan: Loan
}

const LoanStatusForm = ({ loan, ...props }: LoanStatusFormProps) => {
  return loan.isActive ? (
    <ClosedProcessPanel />
  ) : (
    <LoanStatusFormInner loan={loan} {...props} />
  )
}

const LoanStatusFormInner = ({ loan, ...props }: LoanStatusFormProps) => {
  const form = useLoanStatusForm({ loan, ...props })

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormInput name="status" as={LoanStatusCardsInput} />
      </Form>
    </FormContainer>
  )
}

const LoanStatusCardsInput = ({ value, onChange }: InputProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-0 md:grid-cols-2 md:p-6">
      {LOAN_STATUS_CARD_OPTIONS.map(({ status, title, icon, description }) => (
        <LoanStatusCard
          key={status}
          icon={icon}
          title={title}
          className="shadow-sm"
          isSelected={value === status}
          onClick={() => onChange(status)}
        >
          <Paragraph>{description}</Paragraph>
        </LoanStatusCard>
      ))}
    </div>
  )
}

export default LoanStatusForm

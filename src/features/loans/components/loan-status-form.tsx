import {
  DataModuleFormProps,
  Form,
  FormContainer,
  FormInput,
  InputProps,
  Paragraph,
  Tab,
  Tabs,
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
  const form = useLoanStatusForm({ loan, ...props })

  return (
    <Tabs>
      <Tab eventKey="status" title="Estado">
        <FormContainer form={form}>
          <Form form={form}>
            <FormInput name="status" as={LoanStatusCardsInput} />
          </Form>
        </FormContainer>
      </Tab>
    </Tabs>
  )
}

const LoanStatusCardsInput = ({ value, onChange }: InputProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
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

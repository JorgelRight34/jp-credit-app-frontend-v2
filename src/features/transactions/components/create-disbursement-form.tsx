import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  RichTextEditor,
} from '@/components'
import { useDisbursementForm } from '../hooks/useDisbursementForm'
import { Disbursement } from '../models/disbursement'
import { DisbursementFormValues } from '../lib/schemas/disbursementFormSchema'
import {
  calculateNextPaymentDate,
  LoanSearchInput,
  LoanSelectionProvider,
  useEmitLoan,
  useSelectedLoan,
} from '@/features/loans'
import { toCurrency, toFormattedDate, toInputDate } from '@/lib/utils'
import { Project } from '@/features/projects'

interface CreateDisbursementFormProps extends DataModuleFormProps<
  Disbursement,
  DisbursementFormValues
> {
  project: Project
}

const CreateDisbursementForm = (props: CreateDisbursementFormProps) => (
  <LoanSelectionProvider>
    <DisbursementForm {...props} />
  </LoanSelectionProvider>
)

const DisbursementForm = ({
  project,
  ...props
}: CreateDisbursementFormProps) => {
  const form = useDisbursementForm(props)
  const emitLoan = useEmitLoan()

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup
            name="loanId"
            label="Préstamo"
            onSelect={(loan) => {
              emitLoan(loan)
              if (loan) {
                form.setValue('amount', loan?.approvedAmount)
                form.setValue('date', toInputDate(loan.startDate))
              }
            }}
            config={{ initialQuery: { projectId: project.id } }}
            input={LoanSearchInput}
          />
        </FormRow>
        <LoanSummary />
        <FormRow>
          <FormGroup name="amount" label="Monto" input={CurrencyInput} />
          <FormGroup name="date" label="Fecha" input={DateInput} />
        </FormRow>
        <FormGroup
          name="description"
          label="Descripción"
          input={RichTextEditor}
        />
      </Form>
    </FormContainer>
  )
}

const LoanSummary = () => {
  const loan = useSelectedLoan()

  return (
    <>
      <FormRow>
        <FormReadOnlyGroup
          name="approvedAmount"
          label="Monto aprobado"
          value={loan ? toCurrency(loan?.approvedAmount) : '---'}
          disabled
        />
        <FormReadOnlyGroup
          name="disbursedAmount"
          label="Total desembolsado"
          value={loan ? toCurrency(loan?.disbursedAmount) : '---'}
          disabled
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="effectivePaymentDate"
          label="Fecha de pago"
          value={loan ? toFormattedDate(calculateNextPaymentDate(loan)) : '---'}
          disabled
        />
        <FormReadOnlyGroup
          name="lastTransactionDate"
          label="Fecha últ. pago"
          value={
            loan?.lastTransactionDate
              ? toFormattedDate(loan.lastTransactionDate)
              : '---'
          }
          disabled
        />
      </FormRow>
    </>
  )
}

export default CreateDisbursementForm

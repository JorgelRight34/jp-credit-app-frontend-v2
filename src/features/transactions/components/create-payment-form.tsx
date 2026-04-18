import { usePaymentForm } from '../hooks/usePaymentForm'
import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormGroup,
  MasterDetailLayout,
  FormRow,
  RichTextEditor,
  FormSelectGroup,
  Fieldset,
  FormReadOnlyGroup,
  FormContainer,
  FormWatch,
} from '@/components'
import { PaymentFormValues } from '../lib/schemas/paymentFormSchema'
import { Project } from '@/features/projects'
import {
  calculateLoanDebt,
  LoanSearchInput,
  LoanSelectionProvider,
  useEmitLoan,
  useSelectedLoan,
} from '@/features/loans'
import {
  getTodayAsInputDate,
  ND,
  toCurrencyOrND,
  toDate,
  toFormattedDate,
} from '@/lib/utils'
import { PaymentResult } from '../models/paymentResult'

interface CreatePaymentProps extends DataModuleFormProps<
  PaymentResult,
  PaymentFormValues
> {
  project: Project
}

const CreatePaymentForm = (props: CreatePaymentProps) => (
  <LoanSelectionProvider>
    <PaymentForm {...props} />
  </LoanSelectionProvider>
)

const PaymentForm = (props: CreatePaymentProps) => {
  const form = usePaymentForm(props)
  const emitLoan = useEmitLoan()

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <MasterDetailLayout>
          <MasterDetailLayout.MasterExpanded>
            <FormRow>
              <FormGroup
                name="loanId"
                label="Préstamo"
                config={{ initialQuery: { project: props.project.id } }}
                onSelect={(loan) => {
                  emitLoan(loan)
                  if (loan) form.setValue('amount', loan.paymentValue)
                }}
                input={LoanSearchInput}
              />
              <FormSelectGroup
                name="payer"
                label="Actor"
                options={[
                  ['client', 'Cliente'],
                  ['guarantor', 'Garante'],
                  ['loanOfficer', 'Oficial'],
                ]}
              />
            </FormRow>
            <FormRow>
              <FormGroup name="amount" label="Monto" input={CurrencyInput} />
              <FormGroup
                name="date"
                label="Fecha"
                max={getTodayAsInputDate()}
                input={DateInput}
              />
            </FormRow>
            <LoanSummary />
            <FormGroup
              name="description"
              label="Descripción"
              input={RichTextEditor}
            />
          </MasterDetailLayout.MasterExpanded>
          <MasterDetailLayout.Detail>
            <LoanBalanceSummary />
            <FormWatch
              form={form}
              names={['date']}
              render={([date]) => <LoanDebtSummary date={date} />}
            />
          </MasterDetailLayout.Detail>
        </MasterDetailLayout>
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
          label="Monto préstamo"
          value={toCurrencyOrND(loan, (l) => l.approvedAmount)}
          disabled
        />
        <FormReadOnlyGroup
          name="paymentValue"
          label="Valor cuota"
          value={toCurrencyOrND(loan, (l) => l.paymentValue)}
          disabled
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="payDay"
          label="Día de pago"
          value={loan ? toDate(loan?.startDate).getDate() : ND}
          disabled
        />
        <FormReadOnlyGroup
          name="paymentValue"
          label="Ultimo movimiento"
          value={
            loan?.lastTransactionDate
              ? toFormattedDate(loan.lastTransactionDate)
              : ND
          }
          disabled
        />
      </FormRow>
    </>
  )
}

const LoanBalanceSummary = () => {
  const loan = useSelectedLoan()

  return (
    <LoanTotalsCard
      title="Total pagado"
      capital={toCurrencyOrND(
        loan,
        (l) => l.approvedAmount - l.principalBalance,
      )}
      interest={toCurrencyOrND(loan, (l) => l.accruedInterest)}
      fee={toCurrencyOrND(loan, (l) => l.feePaid)}
    />
  )
}

const LoanDebtSummary = ({ date }: { date: string }) => {
  const loan = useSelectedLoan()
  const result = loan ? calculateLoanDebt(loan, new Date(date)) : null

  return (
    <LoanTotalsCard
      title="Total adeudado"
      capital={toCurrencyOrND(result, (r) => r[0])}
      interest={toCurrencyOrND(result, (r) => r[1])}
      fee={toCurrencyOrND(result, (r) => r[2])}
    />
  )
}

const LoanTotalsCard = ({
  title,
  capital,
  interest,
  fee,
}: {
  title: string
  capital: string
  interest: string
  fee: string
}) => (
  <Fieldset legend={title}>
    <FormRow>
      <FormReadOnlyGroup name="capital" label="Capital" value={capital} />
    </FormRow>
    <FormRow>
      <FormReadOnlyGroup name="interest" label="Interés" value={interest} />
    </FormRow>
    <FormRow>
      <FormReadOnlyGroup name="fee" label="Mora" value={fee} />
    </FormRow>
  </Fieldset>
)

export default CreatePaymentForm

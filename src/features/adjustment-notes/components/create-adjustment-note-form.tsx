import {
  CurrencyInput,
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  RichTextEditor,
} from '@/components'
import { useAdjustmentNoteForm } from '../hooks/useAdjustmentNoteForm'
import { AdjustmentNote } from '../models/adjustmentNote'
import { AdjustmentNoteFormValues } from '../lib/schemas/adjustmentNoteFormSchema'
import {
  LoanSearchInput,
  LoanSelectionProvider,
  useEmitLoan,
  useSelectedLoan,
} from '@/features/loans'
import { toCurrency } from '@/lib/utils'

const CreateAdjustmentNoteForm = (
  props: DataModuleFormProps<AdjustmentNote, AdjustmentNoteFormValues>,
) => (
  <LoanSelectionProvider>
    <AdjustmentNoteForm {...props} />
  </LoanSelectionProvider>
)

const AdjustmentNoteForm = (
  props: DataModuleFormProps<AdjustmentNote, AdjustmentNoteFormValues>,
) => {
  const form = useAdjustmentNoteForm(props)
  const emitLoan = useEmitLoan()

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup
            name="loanId"
            label="Préstamo"
            onSelect={emitLoan}
            input={LoanSearchInput}
          />
        </FormRow>
        <LoanSummary />
        <FormRow>
          <FormGroup name="amount" label="Monto" input={CurrencyInput} />
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
          name="principalBalance"
          label="Balance capital"
          value={toCurrency(loan?.principalBalance ?? 0)}
          disabled
        />
        <FormReadOnlyGroup
          name="penaltyBalance"
          value={toCurrency(loan?.penaltyBalance ?? 0)}
          label="Mora"
          disabled
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="approvedAmount"
          value={toCurrency(loan?.approvedAmount ?? 0)}
          label="Monto préstamo"
          disabled
        />
        <FormReadOnlyGroup
          name="paymentValue"
          label="Valor cuota"
          value={toCurrency(loan?.paymentValue ?? 0)}
          disabled
        />
      </FormRow>
    </>
  )
}

export default CreateAdjustmentNoteForm

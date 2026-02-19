import { useTransactionForm } from '../hooks/useTransactionForm'
import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormConfirmationFlow,
  FormConfirmationFlowContainer,
  FormGroup,
  FormRow,
  Input,
  NumericInput,
  PercentageInput,
  RichTextEditor,
} from '@/components'
import { Transaction } from '../models/transaction'
import { TransactionFormValues } from '../lib/schemas/transactionFormSchema'
import { Project } from '@/features/projects'
import { LoanSearchInput } from '@/features/loans'
import TransactionConfirmationStep from './payment-confirmation-step'
import TransactionReceiptStep from './payment-receipt-step'
import { getPaymentPreview } from '../services/transactionClient'

interface CreateTransactionFormProps extends DataModuleFormProps<
  Transaction,
  TransactionFormValues
> {
  project: Project
}

const CreateTransactionForm = (props: CreateTransactionFormProps) => {
  const form = useTransactionForm(props)

  return (
    <FormConfirmationFlow
      confirmation={
        <TransactionConfirmationStep
          form={form}
          previewLoader={getPaymentPreview}
          cacheKeyBuilder={() => []}
        />
      }
      receipt={<TransactionReceiptStep successText="Pago realizado" />}
    >
      <FormConfirmationFlowContainer form={form}>
        <Form form={form}>
          <FormRow>
            <FormGroup name="value" label="Monto" input={CurrencyInput} />
            <FormGroup name="date" label="Fecha" input={DateInput} />
          </FormRow>
          <FormRow>
            <FormGroup name="loanId" label="Préstamo" input={LoanSearchInput} />
            <FormGroup name="payerId" label="Actor" input={Input} />
          </FormRow>
          <FormRow>
            <FormGroup
              name="penaltyRate"
              label="Penalidad"
              input={PercentageInput}
            />
            <FormGroup
              name="daysOfGrace"
              label="Días de gracia"
              input={NumericInput}
            />
          </FormRow>
          <FormGroup
            name="description"
            label="Descripción"
            input={RichTextEditor}
          />
        </Form>
      </FormConfirmationFlowContainer>
    </FormConfirmationFlow>
  )
}

export default CreateTransactionForm

import { useTransactionForm } from '../hooks/useTransactionForm'
import {
  createPickerInputWithOnSelect,
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormConfirmationFlow,
  FormConfirmationFlowContainer,
  FormGroup,
  FormLazySelectGroup,
  FormRow,
  FormWatch,
  PickerInputDataController,
  PickerInputDataControllerRef,
  RichTextEditor,
} from '@/components'
import { Transaction } from '../models/transaction'
import { TransactionFormValues } from '../lib/schemas/transactionFormSchema'
import { Project } from '@/features/projects'
import {
  getLoanActorsSelectOptions,
  Loan,
  LoanSearchInput,
} from '@/features/loans'
import TransactionConfirmationStep from './payment-confirmation-step'
import TransactionReceiptStep from './payment-receipt-step'
import { getPaymentPreview } from '../services/transactionClient'
import PaymentPreviewCard from './payment-preview-card'
import { useRef } from 'react'
import { transactionsQueryKey } from '../lib/constants'

interface CreateTransactionFormProps extends DataModuleFormProps<
  Transaction,
  TransactionFormValues
> {
  project: Project
}

const CreateTransactionForm = (props: CreateTransactionFormProps) => {
  const form = useTransactionForm(props)
  const loanPickerInputDataControllerRef =
    useRef<PickerInputDataControllerRef<Loan>>(null)

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
          <div className="flex-1 h-full flex">
            <div className="flex flex-col w-8/12">
              <FormRow>
                <FormGroup name="value" label="Monto" input={CurrencyInput} />
                <FormGroup name="date" label="Fecha" input={DateInput} />
              </FormRow>
              <FormRow>
                <FormGroup
                  name="loanId"
                  label="Préstamo"
                  input={createPickerInputWithOnSelect(
                    LoanSearchInput,
                    (value) =>
                      loanPickerInputDataControllerRef.current?.setValue(value),
                  )}
                />
                <FormLazySelectGroup
                  name="payerId"
                  label="Actor"
                  watchedValues={['loanId']}
                  loader={([loanId]) =>
                    getLoanActorsSelectOptions(loanId as number)
                  }
                  buildCacheKey={([loanId]) => [
                    transactionsQueryKey,
                    'form',
                    'loan-members',
                    loanId,
                  ]}
                  enabledFn={([loanId]) => !!loanId}
                  allowNoOption={false}
                />
              </FormRow>
              <FormGroup
                name="description"
                label="Descripción"
                input={RichTextEditor}
              />
            </div>
            <div className="w-4/12 pl-6">
              <PickerInputDataController
                ref={loanPickerInputDataControllerRef}
                render={(loan) => (
                  <FormWatch
                    form={form}
                    names={['value']}
                    render={([amount]) => (
                      <PaymentPreviewCard loan={loan} amount={amount} />
                    )}
                  />
                )}
              />
            </div>
          </div>
        </Form>
      </FormConfirmationFlowContainer>
    </FormConfirmationFlow>
  )
}

export default CreateTransactionForm

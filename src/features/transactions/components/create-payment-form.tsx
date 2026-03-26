import { usePaymentForm } from '../hooks/usePaymentForm'
import {
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormConfirmationFlow,
  FormConfirmationFlowContainer,
  FormGroup,
  FormLazySelectGroup,
  MasterDetailLayout,
  FormRow,
  FormWatch,
  PickerInputDataController,
  PickerInputDataControllerRef,
  RichTextEditor,
} from '@/components'
import { Transaction } from '../models/transaction'
import { PaymentFormValues } from '../lib/schemas/paymentFormSchema'
import { Project } from '@/features/projects'
import { Loan, LoanSearchInput } from '@/features/loans'
import TransactionConfirmationStep from './payment-confirmation-step'
import TransactionReceiptStep from './payment-receipt-step'
import { getPaymentPreview } from '../services/transactionClient'
import PaymentPreviewCard from './payment-preview-card'
import { useRef } from 'react'
import { transactionsQueryKey } from '../lib/constants'
import { getPaymentLoanActorsSelectOptions } from '../lib/utils'
import { getTodayAsInputDate } from '@/lib/utils'

interface CreatePaymentProps extends DataModuleFormProps<
  Transaction,
  PaymentFormValues
> {
  project: Project
}

const CreatePayment = (props: CreatePaymentProps) => {
  const form = usePaymentForm(props)
  const loanPickerInputDataControllerRef =
    useRef<PickerInputDataControllerRef<Loan>>(null)

  return (
    <FormConfirmationFlow
      confirmation={
        <TransactionConfirmationStep
          form={form}
          previewLoader={getPaymentPreview}
          cacheKeyBuilder={(body) =>
            body ? ['create-payment', body?.loanId, body.amount] : []
          }
        />
      }
      overview={<TransactionReceiptStep successText="Pago realizado" />}
    >
      <FormConfirmationFlowContainer form={form}>
        <Form form={form}>
          <MasterDetailLayout>
            <MasterDetailLayout.Master>
              <FormRow>
                <FormGroup
                  name="loanId"
                  label="Préstamo"
                  config={{ initialQuery: { project: props.project.id } }}
                  onSelect={(loan) => {
                    loanPickerInputDataControllerRef.current?.setValue(loan)
                    if (loan) form.setValue('amount', loan.paymentValue)
                  }}
                  input={LoanSearchInput}
                />
                <FormLazySelectGroup
                  name="payerId"
                  label="Actor"
                  watchedValues={['loanId']}
                  loader={getPaymentLoanActorsSelectOptions}
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
              <FormRow>
                <FormGroup name="amount" label="Monto" input={CurrencyInput} />
                <FormGroup
                  name="date"
                  label="Fecha"
                  max={getTodayAsInputDate()}
                  input={DateInput}
                />
              </FormRow>
              <FormGroup
                name="description"
                label="Descripción"
                input={RichTextEditor}
              />
            </MasterDetailLayout.Master>
            <MasterDetailLayout.Detail>
              <PickerInputDataController
                ref={loanPickerInputDataControllerRef}
                render={(loan) => (
                  <FormWatch
                    form={form}
                    names={['amount']}
                    render={([amount]) => (
                      <PaymentPreviewCard loan={loan} amount={amount} />
                    )}
                  />
                )}
              />
            </MasterDetailLayout.Detail>
          </MasterDetailLayout>
        </Form>
      </FormConfirmationFlowContainer>
    </FormConfirmationFlow>
  )
}

export default CreatePayment

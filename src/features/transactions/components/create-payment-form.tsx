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
import { PaymentFormValues } from '../lib/schemas/paymentFormSchema'
import { Project } from '@/features/projects'
import { Loan, LoanSearchInput } from '@/features/loans'
import PaymentConfirmationStep from './payment-confirmation-step'
import PaymentReceiptStep, {
  usePaymentReceiptStepRef,
} from './payment-receipt-step'
import { getPaymentPreview } from '../services/transactionClient'
import PaymentPreviewCard from './payment-preview-card'
import { useRef } from 'react'
import { transactionsQueryKey } from '../lib/constants'
import { getPaymentLoanActorsSelectOptions } from '../lib/utils'
import { getTodayAsInputDate } from '@/lib/utils'
import { PaymentResult } from '../models/paymentResult'

interface CreatePaymentProps extends DataModuleFormProps<
  PaymentResult,
  PaymentFormValues
> {
  project: Project
}

const CreatePayment = (props: CreatePaymentProps) => {
  const receiptRef = usePaymentReceiptStepRef()
  const form = usePaymentForm({
    ...props,
    resetValues: true,
    onSuccess: (data) => receiptRef.current?.setPaymentResult(data),
  })
  const loanPickerInputDataControllerRef =
    useRef<PickerInputDataControllerRef<Loan>>(null)

  return (
    <FormConfirmationFlow
      confirmation={
        <PaymentConfirmationStep
          form={form}
          previewLoader={getPaymentPreview}
        />
      }
      overview={
        <PaymentReceiptStep ref={receiptRef} successText="Pago realizado" />
      }
    >
      <FormConfirmationFlowContainer form={form}>
        <Form form={form}>
          <MasterDetailLayout>
            <MasterDetailLayout.MasterExpanded>
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
            </MasterDetailLayout.MasterExpanded>
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

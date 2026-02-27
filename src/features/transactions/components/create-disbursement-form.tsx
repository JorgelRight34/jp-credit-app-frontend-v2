import {
  createPickerInputWithOnSelect,
  CurrencyInput,
  DataModuleFormProps,
  DateInput,
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  PickerInputDataController,
  PickerInputDataControllerRef,
  RichTextEditor,
} from '@/components'
import { useDisbursementForm } from '../hooks/useDisbursementForm'
import { Disbursement } from '../models/disbursement'
import { DisbursementFormValues } from '../lib/schemas/disbursementFormSchema'
import {
  calculateNextPaymentDate,
  Loan,
  LoanSearchInput,
} from '@/features/loans'
import { useRef } from 'react'
import { DASHES, toCurrency, toFormattedDate, toInputDate } from '@/lib/utils'

interface CreateDisbursementFormProps extends DataModuleFormProps<
  Disbursement,
  DisbursementFormValues
> {}

const CreateDisbursementForm = (props: CreateDisbursementFormProps) => {
  const form = useDisbursementForm(props)
  const loanPickerInputDataControllerRef =
    useRef<PickerInputDataControllerRef<Loan>>(null)

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup
            name="loanId"
            label="Préstamo"
            input={createPickerInputWithOnSelect(LoanSearchInput, (loan) => {
              loanPickerInputDataControllerRef.current?.setValue(loan)
              if (loan) {
                form.setValue('amount', loan?.approvedAmount)
                form.setValue('date', toInputDate(loan.startDate))
              }
            })}
          />
        </FormRow>
        <PickerInputDataController
          ref={loanPickerInputDataControllerRef}
          render={(loan) => (
            <>
              <FormRow>
                <FormReadOnlyGroup
                  name="approvedAmount"
                  label="Monto aprobado"
                  value={loan ? toCurrency(loan?.approvedAmount) : DASHES}
                  disabled
                />
                <FormReadOnlyGroup
                  name="disbursedAmount"
                  label="Total desembolsado"
                  value={loan ? toCurrency(loan?.disbursedAmount) : DASHES}
                  disabled
                />
              </FormRow>
              <FormRow>
                <FormReadOnlyGroup
                  name="effectivePaymentDate"
                  label="Fecha de pago"
                  value={
                    loan
                      ? toFormattedDate(calculateNextPaymentDate(loan))
                      : DASHES
                  }
                  disabled
                />
                <FormReadOnlyGroup
                  name="lastPaymentDate"
                  label="Fecha ult. pago"
                  value={
                    loan?.lastPaymentDate
                      ? toFormattedDate(loan.lastPaymentDate)
                      : DASHES
                  }
                  disabled
                />
              </FormRow>
            </>
          )}
        />

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

export default CreateDisbursementForm

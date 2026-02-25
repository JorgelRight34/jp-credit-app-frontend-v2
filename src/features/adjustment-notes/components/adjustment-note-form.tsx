import {
  createPickerInputWithOnSelect,
  CurrencyInput,
  DataModuleFormProps,
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
  PickerInputDataController,
  PickerInputDataControllerRef,
  RichTextEditor,
} from '@/components'
import { useAdjustmentNoteForm } from '../hooks/useAdjustmentNoteForm'
import { AdjustmentNote } from '../models/adjustmentNote'
import { AdjustmentNoteFormValues } from '../lib/schemas/adjustmentNoteFormSchema'
import { Loan, LoanSearchInput } from '@/features/loans'
import { useRef } from 'react'
import { toCurrency } from '@/lib/utils'

const AdjustmentNoteForm = (
  props: DataModuleFormProps<AdjustmentNote, AdjustmentNoteFormValues>,
) => {
  const loanPickerInputDataControllerRef =
    useRef<PickerInputDataControllerRef<Loan>>(null)
  const form = useAdjustmentNoteForm(props)

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormRow>
          <FormGroup
            name="loanId"
            label="Préstamo"
            input={createPickerInputWithOnSelect(LoanSearchInput, (loan) =>
              loanPickerInputDataControllerRef.current?.setValue(loan),
            )}
          />
        </FormRow>
        <FormRow>
          <PickerInputDataController
            ref={loanPickerInputDataControllerRef}
            render={(loan) => (
              <>
                <FormReadOnlyGroup
                  name="principalBalance"
                  label="Balance capital"
                  value={toCurrency(loan?.principalBalance ?? 0)}
                  disabled
                />
                <FormReadOnlyGroup
                  name="interestBalance"
                  label="Balance interés"
                  value={toCurrency(loan?.interestBalance ?? 0)}
                  disabled
                />
              </>
            )}
          />
        </FormRow>
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

export default AdjustmentNoteForm

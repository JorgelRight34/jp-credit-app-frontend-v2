import {
  ConfirmationModal,
  ConfirmationModalRef,
  DataModuleFormProps,
  DateInput,
  Form,
  FormContainer,
  FormGroup,
  FormReadOnlyGroup,
  FormRow,
} from '@/components'
import { useClosePeriodForm } from '../hooks/useClosePeriodForm'
import { AccountingPeriod, ClosedPeriod } from '../models/accountingPeriod'
import { ClosedPeriodFormValues } from '../lib/schemas/closePeriodFormSchema'
import { getTodayAsInputDate, toFormattedDate, toInputDate } from '@/lib/utils'
import { useRef } from 'react'

interface CreateClosedPeriodFormProps extends DataModuleFormProps<
  ClosedPeriod,
  ClosedPeriodFormValues
> {
  currentPeriod: AccountingPeriod
}

const CreateClosedPeriodForm = ({
  currentPeriod,
  ...props
}: CreateClosedPeriodFormProps) => {
  const modalRef = useRef<ConfirmationModalRef>(null)
  const form = useClosePeriodForm({
    initialValues: { endDate: toInputDate(currentPeriod.startDate) },
    ...props,
  })

  return (
    <FormContainer
      form={form}
      onSubmit={() => modalRef.current?.show()}
      initializeAsDirty
    >
      <Form form={form}>
        <FormRow>
          <FormReadOnlyGroup
            label="Fecha de inicio"
            name="startDate"
            value={toFormattedDate(currentPeriod.startDate)}
            disabled
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label="Fecha final"
            name="endDate"
            input={DateInput}
            max={getTodayAsInputDate()}
          />
        </FormRow>
      </Form>
      <ConfirmationModal
        title="Confirmar cierre del período"
        confirmationMessage="Esta acción cerrará el período actual y no podrá deshacerse. ¿Desea continuar?"
        ref={modalRef}
        onConfirm={form.form.submit}
      />
    </FormContainer>
  )
}

export default CreateClosedPeriodForm

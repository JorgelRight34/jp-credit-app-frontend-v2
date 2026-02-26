import {
  Fieldset,
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  FormRow,
} from '@/components'
import { AdjustmentNote } from '../models/adjustmentNote'
import { buildLoanLabelById } from '@/features/loans'
import { buildProfileFullName } from '@/features/profiles'
import { toCurrency, toFormattedDate } from '@/lib/utils'

const AdjustmentNoteOverview = ({
  adjustmentNote,
}: {
  adjustmentNote: AdjustmentNote
}) => {
  return (
    <section className="flex flex-col h-full">
      <FormRow>
        <Fieldset legend="Contrato">
          <FormRow>
            <FormReadOnlyGroup
              name="loanId"
              label="Préstamo"
              value={buildLoanLabelById(adjustmentNote.loanId)}
            />
            <FormReadOnlyGroup
              name="clientName"
              label="Cliente"
              value={buildProfileFullName(adjustmentNote.client)}
            />
          </FormRow>
        </Fieldset>
      </FormRow>
      <FormRow>
        <Fieldset legend="Detalles">
          <FormRow>
            <FormReadOnlyGroup
              name="amount"
              label="Monto"
              value={toCurrency(adjustmentNote.amount)}
            />
            <FormReadOnlyGroup
              name="date"
              label="Fecha"
              value={toFormattedDate(adjustmentNote.date)}
            />
          </FormRow>
        </Fieldset>
      </FormRow>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={adjustmentNote.description ?? 'Sin descripción'}
      />
    </section>
  )
}

export default AdjustmentNoteOverview

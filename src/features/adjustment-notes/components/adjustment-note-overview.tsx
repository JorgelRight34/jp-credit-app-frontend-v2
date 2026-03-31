import {
  Fieldset,
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  OverviewLayout,
  LayoutRow,
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
    <OverviewLayout>
      <Fieldset legend="Contrato">
        <LayoutRow>
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
        </LayoutRow>
      </Fieldset>
      <Fieldset legend="Detalles">
        <LayoutRow>
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
        </LayoutRow>
      </Fieldset>
      <FormHtmlDisplayGroup
        name="description"
        label="Descripción"
        value={adjustmentNote.description ?? 'Sin descripción'}
      />
    </OverviewLayout>
  )
}

export default AdjustmentNoteOverview

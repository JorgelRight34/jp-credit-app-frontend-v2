import {
  Fieldset,
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  OverviewLayout,
  Row,
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
        <Row>
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
        </Row>
      </Fieldset>
      <Fieldset legend="Detalles">
        <Row>
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
        </Row>
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

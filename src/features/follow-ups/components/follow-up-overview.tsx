import { FormHtmlDisplayGroup, FormReadOnlyGroup, FormRow } from '@/components'
import { FollowUp } from '../models/followUp'
import { buildLoanLabelById } from '@/features/loans'
import { toFormattedDate } from '@/lib/utils'

const FollowUpOverview = ({ followUp }: { followUp: FollowUp }) => {
  return (
    <section className="h-full flex flex-col">
      <FormRow>
        <FormReadOnlyGroup name="title" label="Título" value={followUp.title} />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="loanId"
          label="Préstamo"
          value={buildLoanLabelById(followUp.id)}
        />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="date"
          label="Fecha"
          value={toFormattedDate(followUp.date)}
          disabled
        />
      </FormRow>
      <FormHtmlDisplayGroup name="body" label="Cuerpo" value={followUp.body} />
    </section>
  )
}

export default FollowUpOverview

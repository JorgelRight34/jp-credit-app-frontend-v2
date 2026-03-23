import { FormHtmlDisplayGroup, FormReadOnlyGroup, FormRow } from '@/components'
import { FollowUp } from '../models/followUp'
import { buildLoanLabelById } from '@/features/loans'
import { toFormattedDate } from '@/lib/utils'
import { buildProfileFullName } from '@/features/profiles'

const FollowUpOverview = ({ followUp }: { followUp: FollowUp }) => {
  return (
    <section className="flex h-full flex-col">
      <FormRow>
        <FormReadOnlyGroup name="title" label="Título" value={followUp.title} />
      </FormRow>
      <FormRow>
        <FormReadOnlyGroup
          name="loanId"
          label="Préstamo"
          value={buildLoanLabelById(followUp.id)}
        />
        <FormReadOnlyGroup
          name="clientId"
          label="Cliente"
          value={buildProfileFullName(followUp.client)}
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

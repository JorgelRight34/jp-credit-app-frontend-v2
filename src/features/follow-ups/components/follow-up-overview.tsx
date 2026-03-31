import {
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  OverviewLayout,
  LayoutRow,
} from '@/components'
import { FollowUp } from '../models/followUp'
import { buildLoanLabelById } from '@/features/loans'
import { toFormattedDate } from '@/lib/utils'
import { buildProfileFullName } from '@/features/profiles'

const FollowUpOverview = ({ followUp }: { followUp: FollowUp }) => {
  return (
    <OverviewLayout>
      <LayoutRow>
        <FormReadOnlyGroup name="title" label="Título" value={followUp.title} />
      </LayoutRow>
      <LayoutRow>
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
      </LayoutRow>
      <LayoutRow>
        <FormReadOnlyGroup
          name="date"
          label="Fecha"
          value={toFormattedDate(followUp.date)}
          disabled
        />
      </LayoutRow>
      <FormHtmlDisplayGroup name="body" label="Cuerpo" value={followUp.body} />
    </OverviewLayout>
  )
}

export default FollowUpOverview

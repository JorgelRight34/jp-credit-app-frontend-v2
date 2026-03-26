import {
  FormHtmlDisplayGroup,
  FormReadOnlyGroup,
  OverviewLayout,
  Row,
} from '@/components'
import { FollowUp } from '../models/followUp'
import { buildLoanLabelById } from '@/features/loans'
import { toFormattedDate } from '@/lib/utils'
import { buildProfileFullName } from '@/features/profiles'

const FollowUpOverview = ({ followUp }: { followUp: FollowUp }) => {
  return (
    <OverviewLayout>
      <Row>
        <FormReadOnlyGroup name="title" label="Título" value={followUp.title} />
      </Row>
      <Row>
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
      </Row>
      <Row>
        <FormReadOnlyGroup
          name="date"
          label="Fecha"
          value={toFormattedDate(followUp.date)}
          disabled
        />
      </Row>
      <FormHtmlDisplayGroup name="body" label="Cuerpo" value={followUp.body} />
    </OverviewLayout>
  )
}

export default FollowUpOverview

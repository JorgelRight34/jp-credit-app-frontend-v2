import { AssignmentIcon, BreadcrumbSpec } from '@/components'
import { FollowUp } from '../../models/followUp'

export const followUpBreadcrumb: BreadcrumbSpec = {
  icon: () => <AssignmentIcon />,
  title: 'Seguimientos',
  pathname: '/follow-ups',
}

export const buildFollowUpBreadcrumb = (
  followUp: FollowUp,
): BreadcrumbSpec => ({
  icon: () => <AssignmentIcon />,
  title: `Seguimiento No. ${followUp.id}`,
  pathname: '/follow-ups/$id',
  params: { id: followUp.id.toString() },
})

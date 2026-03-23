import {
  AssignmentIcon,
  BreadcrumbSpec,
  buildPageLayoutEditOption,
  overviewBreadcrumb,
  PageLayout,
  PageLayoutBreadcrumb,
  Panel,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { FollowUp } from '../models/followUp'
import FollowUpOverview from '../components/follow-up-overview'

export const buildFollowUpBreadcrumb = (
  followUp: FollowUp,
): BreadcrumbSpec => ({
  icon: () => <AssignmentIcon />,
  title: `Seguimiento No. ${followUp.id}`,
  pathname: '/follow-ups/$id',
  params: { id: followUp.id.toString() },
})

export const followUpBreadcrumb: BreadcrumbSpec = {
  icon: AssignmentIcon,
  title: 'Seguimientos',
  pathname: '/follow-ups',
}

const FollowUpPage = ({ followUp }: { followUp: FollowUp }) => {
  return (
    <PageLayout
      title={followUp.title}
      options={[
        buildPageLayoutEditOption('/follow-ups/$id/edit', {
          id: followUp.id.toString(),
        }),
      ]}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[
            followUpBreadcrumb,
            buildFollowUpBreadcrumb(followUp),
            overviewBreadcrumb,
          ]}
        />
      }
    >
      <Panel>
        <FollowUpOverview followUp={followUp} />
      </Panel>
    </PageLayout>
  )
}

export default FollowUpPage

import {
  AssignmentIcon,
  BreadcrumbSpec,
  buildPageLayoutEditOption,
  overviewBreadcrumb,
  PageLayout,
  PageLayoutBreadcrumb,
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
      <Tabs>
        <TabsList>
          <Tab index={0}>Resumen</Tab>
        </TabsList>
        <TabPanel index={0}>
          <FollowUpOverview followUp={followUp} />
        </TabPanel>
      </Tabs>
    </PageLayout>
  )
}

export default FollowUpPage

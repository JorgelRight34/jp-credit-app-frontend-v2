import {
  buildPageLayoutEditOption,
  overviewBreadcrumb,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabList,
} from '@/components'
import { FollowUp } from '../models/followUp'
import {
  buildFollowUpBreadcrumb,
  followUpBreadcrumb,
} from '../lib/config/breadcrumb'
import { followUpPermissionProvider } from '../lib/config/permission-provider'
import FollowUpOverview from '../components/follow-up-overview'

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
      permissionProvider={followUpPermissionProvider}
    >
      <TabList>
        <Tab title="Resumen" isActive />
      </TabList>
      <FollowUpOverview followUp={followUp} />
    </PageLayout>
  )
}

export default FollowUpPage

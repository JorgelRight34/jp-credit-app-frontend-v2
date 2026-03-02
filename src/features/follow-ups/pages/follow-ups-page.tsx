import {
  AllIcon,
  buildPageLayoutCreateOption,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabList,
} from '@/components'
import { followUpBreadcrumb } from '../lib/config/breadcrumb'
import FollowUpDataTable from '../components/follow-up-datatable'

const FollowUpsPage = () => {
  return (
    <PageLayout
      title="Seguimientos"
      options={[buildPageLayoutCreateOption('/follow-ups/create')]}
      breadcrumb={
        <PageLayoutBreadcrumb
          breadcrumbs={[followUpBreadcrumb, { title: 'Todos', icon: AllIcon }]}
        />
      }
    >
      <TabList>
        <Tab title="Todos" isActive />
      </TabList>
      <FollowUpDataTable />
    </PageLayout>
  )
}

export default FollowUpsPage

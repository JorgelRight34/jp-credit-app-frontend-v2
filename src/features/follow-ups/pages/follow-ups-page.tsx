import {
  AllIcon,
  buildPageLayoutCreateOption,
  PageLayout,
  PageLayoutBreadcrumb,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import FollowUpDataTable from '../components/follow-up-datatable'
import { followUpBreadcrumb } from './follow-up-page'

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
      <Tabs>
        <TabsList>
          <Tab index={0}>Todos</Tab>
        </TabsList>
        <TabPanel index={0}>
          <FollowUpDataTable />
        </TabPanel>
      </Tabs>
    </PageLayout>
  )
}

export default FollowUpsPage

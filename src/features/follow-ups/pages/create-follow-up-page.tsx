import {
  CreateFormPageLayout,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from '@/components'
import { followUpPermissionProvider } from '../lib/config/permission-provider'
import FollowUpForm from '../components/follow-up-form'
import { followUpBreadcrumb } from './follow-up-page'

const CreateFollowUpPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear seguimiento"
      permissionProvider={followUpPermissionProvider}
      breadcrumbs={[followUpBreadcrumb]}
    >
      <Tabs>
        <TabsList>
          <Tab index={0}>Formulario</Tab>
        </TabsList>
        <TabPanel index={0}>
          <FollowUpForm />
        </TabPanel>
      </Tabs>
    </CreateFormPageLayout>
  )
}

export default CreateFollowUpPage

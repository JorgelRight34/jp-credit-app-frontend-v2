import { CreateFormPageLayout, Tab, TabList } from '@/components'
import { followUpPermissionProvider } from '../lib/config/permission-provider'
import { followUpBreadcrumb } from '../lib/config/breadcrumb'
import FollowUpForm from '../components/follow-up-form'

const CreateFollowUpPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear seguimiento"
      permissionProvider={followUpPermissionProvider}
      breadcrumbs={[followUpBreadcrumb]}
    >
      <TabList>
        <Tab title="Formulario" isActive />
      </TabList>
      <FollowUpForm />
    </CreateFormPageLayout>
  )
}

export default CreateFollowUpPage

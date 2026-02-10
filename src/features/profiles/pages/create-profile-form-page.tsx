import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import { CreateFormPageLayout } from '@/components'
import CreateProfileForm from '../components/create-profile-form'

const CreateProfileFormPage = () => {
  return (
    <CreateFormPageLayout
      title="pérfil"
      breadcrumbs={[profilesBreadcrumb]}
      permissionProvider={profilesPermissionProvider}
    >
      <CreateProfileForm />
    </CreateFormPageLayout>
  )
}

export default CreateProfileFormPage

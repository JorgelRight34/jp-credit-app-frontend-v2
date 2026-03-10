import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { CreateFormPageLayout } from '@/components'
import CreateProfileForm from '../components/create-profile-form'
import { profilesBreadcrumb } from './profiles-page'

const CreateProfileFormPage = () => {
  return (
    <CreateFormPageLayout
      title="Crear pérfil"
      breadcrumbs={[profilesBreadcrumb]}
      permissionProvider={profilesPermissionProvider}
    >
      <CreateProfileForm />
    </CreateFormPageLayout>
  )
}

export default CreateProfileFormPage

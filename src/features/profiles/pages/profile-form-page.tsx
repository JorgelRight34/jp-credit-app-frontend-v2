import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import { profilesBreadcrumb } from '../lib/config/breadcrumb'
import ProfileForm from '../components/profile-form'
import { FormPageLayout } from '@/components'

const ProfileFormPage = () => {
  return (
    <FormPageLayout
      title="Crear pérfil"
      breadcrumbs={[profilesBreadcrumb]}
      permissionProvider={profilesPermissionProvider}
    >
      <ProfileForm />
    </FormPageLayout>
  )
}

export default ProfileFormPage

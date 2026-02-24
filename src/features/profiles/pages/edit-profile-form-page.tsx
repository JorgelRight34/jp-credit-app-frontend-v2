import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import {
  buildProfileBreadcrumb,
  profilesBreadcrumb,
} from '../lib/config/breadcrumb'
import type { Profile } from '../models/profile'
import { EditFormPageLayout } from '@/components'
import { getFullName } from '@/lib/utils'
import EditProfileForm from '../components/edit-profile-form'

const EditProfileFormPage = ({ profile }: { profile: Profile }) => {
  return (
    <EditFormPageLayout
      title={getFullName(profile)}
      breadcrumbs={[profilesBreadcrumb, buildProfileBreadcrumb(profile)]}
      permissionProvider={profilesPermissionProvider}
    >
      <EditProfileForm profile={profile} />
    </EditFormPageLayout>
  )
}

export default EditProfileFormPage

import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import type { PropsWithProfile } from '../models/profile'
import { buildPageLayoutDeleteOption, EditFormPageLayout } from '@/components'
import { getFullName } from '@/lib/utils'
import EditProfileForm from '../components/edit-profile-form'
import { profilesBreadcrumb } from './profiles-page'
import { buildProfileBreadcrumb } from './profile-page'

const EditProfilePage = ({ profile }: PropsWithProfile) => (
  <EditFormPageLayout
    title={getFullName(profile)}
    breadcrumbs={[profilesBreadcrumb, buildProfileBreadcrumb(profile)]}
    permissionProvider={profilesPermissionProvider}
    options={[
      buildPageLayoutDeleteOption({
        disabled: profile.hasLoans,
        to: '/profiles/$id/delete',
        params: { id: profile.id.toString() },
        tooltip: 'No puede borrar un perfil que tenga préstamos.',
      }),
    ]}
  >
    <EditProfileForm profile={profile} />
  </EditFormPageLayout>
)

export default EditProfilePage

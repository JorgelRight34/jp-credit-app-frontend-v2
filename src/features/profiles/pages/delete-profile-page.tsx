import { PropsWithProfile } from '../models/profile'
import { buildProfileFullName } from '../lib/utils'
import { profilesBreadcrumb } from './profiles-page'
import { buildProfileBreadcrumb } from './profile-page'
import DeleteProfileForm from '../components/delete-profile-form'
import { DeleteFormPageLayout } from '@/components'
import { profilesPermissionProvider } from '../lib/config/permissionProvider'

const DeleteProfileFormPage = ({ profile }: PropsWithProfile) => (
  <DeleteFormPageLayout
    title={buildProfileFullName(profile)}
    breadcrumbs={[profilesBreadcrumb, buildProfileBreadcrumb(profile)]}
    permissionProvider={profilesPermissionProvider}
    disabled={profile.hasLoans}
  >
    <DeleteProfileForm profile={profile} />
  </DeleteFormPageLayout>
)

export default DeleteProfileFormPage

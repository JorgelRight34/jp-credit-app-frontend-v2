import { profilesPermissionProvider } from '../lib/config/permissionProvider'
import {
  createProfileBreadcrumb,
  profilesBreadcrumb,
} from '../lib/config/breadcrumb'
import ProfileForm from '../components/profile-form'
import type { Profile } from '../models/profile'
import { FormPageLayout } from '@/components'
import { getFullName } from '@/lib/utils'

const ProfileFormPage = ({ profile }: { profile?: Profile }) => {
  return (
    <FormPageLayout
      title={profile ? getFullName(profile) : 'pérfil'}
      mode={profile ? 'edit' : 'create'}
      breadcrumbs={
        profile
          ? [profilesBreadcrumb, createProfileBreadcrumb(profile)]
          : [profilesBreadcrumb]
      }
      permissionProvider={profilesPermissionProvider}
    >
      <ProfileForm profile={profile} />
    </FormPageLayout>
  )
}

export default ProfileFormPage

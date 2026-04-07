import {
  ChangeHistoryDataTable,
  ChangeHistoryPageLayout,
} from '@/features/audit'
import { PropsWithProfile } from '../models/profile'
import { profilesBreadcrumb } from './profiles-page'
import { buildProfileBreadcrumb } from './profile-page'
import { buildProfileFullName } from '../lib/utils'
import { buildProfileChangeHistoryKey } from '../lib/query-keys'
import { getProfileChangeHistory } from '../services/profileClient'

const ProfileChangeHistoryPage = ({ profile }: PropsWithProfile) => {
  return (
    <ChangeHistoryPageLayout
      title={buildProfileFullName(profile)}
      breadcrumbs={[profilesBreadcrumb, buildProfileBreadcrumb(profile)]}
    >
      <ChangeHistoryDataTable
        cacheKey={buildProfileChangeHistoryKey(profile.id)}
        loader={(q) => getProfileChangeHistory(profile.id, q)}
      />
    </ChangeHistoryPageLayout>
  )
}

export default ProfileChangeHistoryPage

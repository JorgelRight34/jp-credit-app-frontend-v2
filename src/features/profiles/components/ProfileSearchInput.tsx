import ProfilesSection from './ProfilesSection'
import {
  profilesQueryKey,
  profileRolesSpanishTranslations,
} from '../lib/constants'
import { Profile } from '../models/profile'
import { getFullName, toTitleCase } from '@/lib/utils/utils'
import { ProfileQuery } from '../models/profileQuery'
import { EntitySearchInput, EntitySearchInputProps } from '@/components'
import { profilesClient } from '../services/profilesClient'

type ProfileSearchInputProps = EntitySearchInputProps<Profile, ProfileQuery>

const ProfileSearchInput = ({
  role = 'profile',
  id,
  onChange,
  ...props
}: ProfileSearchInputProps) => {
  return (
    <EntitySearchInput<Profile, ProfileQuery>
      cacheKey={profilesQueryKey}
      modalProps={{
        title: `Buscar ${toTitleCase(
          profileRolesSpanishTranslations[role ?? 'profile'],
        )}`,
        height: '90dvh',
        width: '75dvw',
      }}
      accesorFn={(p) => p?.id}
      visibleValueFn={getFullName}
      onSearch={profilesClient.getProfile}
      role={role}
      onChange={onChange}
      id={id}
      render={(setValue) => (
        <ProfilesSection {...props} table={{ onRowClick: setValue }} />
      )}
      {...props}
    />
  )
}

export default ProfileSearchInput

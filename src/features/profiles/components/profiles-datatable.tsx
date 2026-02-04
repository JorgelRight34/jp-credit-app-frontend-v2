import { profileSearchConfig } from '../lib/config/profiles-search-config'
import { createProfilesDataTableConfig } from '../lib/config/profiles-datatable-config'
import type { Profile } from '../models/profile'
import type { ProfileQuery } from '../models/profileQuery'
import type { DataTableContainerOverrides } from '@/components'
import type { ProfileRole } from '../models/profileRole'
import { DataTableContainer } from '@/components'

interface ProfilesDataTableProps extends DataTableContainerOverrides<
  Profile,
  ProfileQuery
> {
  role?: ProfileRole
}

const ProfilesDataTable = ({
  role = 'profile',
  ...props
}: ProfilesDataTableProps) => {
  return (
    <DataTableContainer
      searchConfig={profileSearchConfig}
      datatableConfig={createProfilesDataTableConfig(role)}
      {...props}
    />
  )
}

export default ProfilesDataTable

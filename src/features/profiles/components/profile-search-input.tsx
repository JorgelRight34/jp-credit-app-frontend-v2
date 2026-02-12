import {
  DataTableContainer,
  DataTableContainerOverrides,
  Icon,
  InputProps,
  PersonIcon,
  SearchableComboBox,
} from '@/components'
import { Profile } from '../models/profile'
import { loansQueryKey } from '@/features/loans/lib/constants'
import { getFullName } from '@/lib/utils'
import { getProfile } from '../services/profileClient'
import { ProfileQuery } from '../models/profileQuery'
import { profileSearchConfig } from '../lib/config/profiles-search-config'
import { createProfileSearchInputDataTableConfig } from '../lib/config/profiles-datatable-config'

interface ProfileSearchInputProps extends InputProps {
  datatable?: DataTableContainerOverrides<Profile, ProfileQuery>
}

const ProfileSearchInput = ({
  datatable,
  ...props
}: ProfileSearchInputProps) => {
  return (
    <SearchableComboBox<Profile, number>
      modalProps={{
        title: <Icon icon={PersonIcon}>Pérfiles</Icon>,
      }}
      cacheKey={[loansQueryKey]}
      accesorFn={(p) => p?.id ?? 0}
      visibleValueFn={(p) => (p ? getFullName(p) : '')}
      render={(setValue) => (
        <DataTableContainer
          searchConfig={profileSearchConfig}
          datatableConfig={createProfileSearchInputDataTableConfig(setValue)}
        />
      )}
      loader={getProfile}
      {...props}
    />
  )
}

export default ProfileSearchInput

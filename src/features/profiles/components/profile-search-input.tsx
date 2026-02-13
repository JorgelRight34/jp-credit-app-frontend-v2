import {
  DataTableContainer,
  DataTableContainerOverrides,
  Icon,
  InputProps,
  PersonIcon,
  SearchableComboBox,
  SearchableComboBoxPanel,
} from '@/components'
import { Profile } from '../models/profile'
import { getFullName } from '@/lib/utils'
import { getProfile } from '../services/profileClient'
import { ProfileQuery } from '../models/profileQuery'
import { profileSearchConfig } from '../lib/config/profiles-search-config'
import { createProfileSearchInputDataTableConfig } from '../lib/config/profiles-datatable-config'
import { profilesQueryKey } from '../lib/constants'

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
      cacheKey={[profilesQueryKey]}
      accesorFn={(p) => p?.id ?? 0}
      visibleValueFn={(p) => (p ? getFullName(p) : '')}
      render={(setValue) => (
        <SearchableComboBoxPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={profileSearchConfig}
            cacheKey={[profilesQueryKey]}
            datatableConfig={createProfileSearchInputDataTableConfig(setValue)}
          />
        </SearchableComboBoxPanel>
      )}
      loader={getProfile}
      {...props}
    />
  )
}

export default ProfileSearchInput

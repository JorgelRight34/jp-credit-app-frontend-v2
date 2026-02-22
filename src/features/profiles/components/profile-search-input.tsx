import {
  DataPickerInputProps,
  DataTableContainer,
  Icon,
  PersonIcon,
  PickerInput,
  PickerInputPanel,
} from '@/components'
import { Profile } from '../models/profile'
import { getFullName } from '@/lib/utils'
import { getProfile } from '../services/profileClient'
import { ProfileQuery } from '../models/profileQuery'
import { profileSearchConfig } from '../lib/config/profiles-search-config'
import { createProfileSearchInputDataTableConfig } from '../lib/config/profiles-datatable-config'
import { profilesQueryKey } from '../lib/constants'

const ProfileSearchInput = ({
  datatable,
  ...props
}: DataPickerInputProps<Profile, ProfileQuery>) => {
  return (
    <PickerInput<Profile, number>
      modalProps={{
        title: <Icon icon={PersonIcon}>Pérfiles</Icon>,
      }}
      cacheKey={[profilesQueryKey]}
      accesorFn={(p) => p?.id ?? 0}
      visibleValueFn={(p) => (p ? getFullName(p) : '')}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={profileSearchConfig}
            cacheKey={[profilesQueryKey]}
            datatableConfig={createProfileSearchInputDataTableConfig(setValue)}
          />
        </PickerInputPanel>
      )}
      loader={getProfile}
      {...props}
    />
  )
}

export default ProfileSearchInput

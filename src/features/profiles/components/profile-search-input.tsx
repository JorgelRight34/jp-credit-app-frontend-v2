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
import { ProfileRole } from '../models/profileRole'

interface ProfileSearchInputProps extends DataPickerInputProps<
  Profile,
  ProfileQuery
> {
  title?: string
  role?: ProfileRole
}

export type ProfileRoleSearchInputProps = DataPickerInputProps<
  Profile,
  ProfileQuery
>

const ProfileSearchInput = ({
  title = 'Pérfiles',
  role = 'profile',
  config,
  ...props
}: ProfileSearchInputProps) => {
  return (
    <PickerInput<Profile, number>
      modalProps={{
        title: <Icon icon={PersonIcon}>{title}</Icon>,
      }}
      cacheKey={[profilesQueryKey]}
      accesorFn={(p) => p?.id ?? 0}
      visibleValueFn={(p) => (p ? getFullName(p) : '')}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={profileSearchConfig}
            cacheKey={[profilesQueryKey, role]}
            datatableConfig={createProfileSearchInputDataTableConfig(
              setValue,
              role,
            )}
            {...config}
          />
        </PickerInputPanel>
      )}
      loader={getProfile}
      {...props}
    />
  )
}

export default ProfileSearchInput

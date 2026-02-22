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
import { profilesQueryKey } from '../lib/constants'
import { profileSearchConfig } from '../lib/config/profiles-search-config'
import { createProfileSearchInputDataTableConfig } from '../lib/config/profiles-datatable-config'

const LoanOfficerSearchInput = ({
  datatable,
  ...props
}: DataPickerInputProps<Profile, ProfileQuery>) => {
  return (
    <PickerInput<Profile, number>
      modalProps={{
        title: <Icon icon={PersonIcon}>Agentes</Icon>,
      }}
      cacheKey={[profilesQueryKey, 'loanOfficers']}
      accesorFn={(p) => p?.id ?? 0}
      visibleValueFn={(p) => (p ? getFullName(p) : '')}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={profileSearchConfig}
            cacheKey={[profilesQueryKey, 'loanOfficers']}
            datatableConfig={createProfileSearchInputDataTableConfig(
              setValue,
              'loanOfficer',
            )}
          />
        </PickerInputPanel>
      )}
      loader={getProfile}
      {...props}
    />
  )
}

export default LoanOfficerSearchInput

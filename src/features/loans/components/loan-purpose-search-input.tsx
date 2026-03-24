import {
  DataPickerInputProps,
  DataTableContainer,
  FlagIcon,
  Icon,
  PickerInput,
  PickerInputPanel,
} from '@/components'
import { LoanPurpose } from '../models/loanPurpose'
import { LoanPurposeQuery } from '../models/loanPurposeQuery'
import { loanPurposesQueryKey, loansQueryKey } from '../lib/query-keys'
import { loanPurposeSearchConfig } from '../lib/config/loan-purpose-search-config'
import { buildLoanPurposeSearchInputDataTableConfig } from '../lib/config/loan-purpose-datatable-config'
import { getLoanPurpose } from '../services/loanClient'

const cacheKey = [loansQueryKey, loanPurposesQueryKey]

const LoanPurposeSearchInput = ({
  config,
  ...props
}: DataPickerInputProps<LoanPurpose, LoanPurposeQuery>) => {
  return (
    <PickerInput<LoanPurpose, number>
      modalProps={{ title: <Icon icon={FlagIcon}>Destinos</Icon> }}
      cacheKey={cacheKey}
      accesorFn={(l) => l?.id}
      visibleValueFn={(l) => l?.name ?? '---'}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={loanPurposeSearchConfig}
            cacheKey={cacheKey}
            datatableConfig={buildLoanPurposeSearchInputDataTableConfig(
              setValue,
            )}
            {...config}
          />
        </PickerInputPanel>
      )}
      loader={getLoanPurpose}
      {...props}
    />
  )
}

export default LoanPurposeSearchInput

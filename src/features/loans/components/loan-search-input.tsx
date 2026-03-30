import { loanSearchConfig } from '../lib/config/loan-search-config'
import { buildLoanSearchInputDataTableConfig } from '../lib/config/loan-datatable-config'
import type { LoanQuery } from '../models/loanQuery'
import type { Loan } from '../models/loan'
import { DataPickerInputProps, Icon, PickerInputPanel } from '@/components'
import { DataTableContainer, LoanIcon, PickerInput } from '@/components'
import { buildLoanLabel } from '../lib/utils'
import { getLoan } from '../services/loanClient'
import { loansQueryKey } from '../lib/query-keys'
import { buildProfileFullName } from '@/features/profiles'

const LoanSearchInput = ({
  config,
  ...props
}: DataPickerInputProps<Loan, LoanQuery>) => {
  return (
    <PickerInput<Loan, number>
      modalProps={{
        title: <Icon icon={LoanIcon}>Préstamos</Icon>,
      }}
      cacheKey={[loansQueryKey]}
      accesorFn={(l) => l?.id}
      visibleValueFn={(loan) =>
        loan
          ? buildLoanLabel(loan) + ' | ' + buildProfileFullName(loan.client)
          : '---'
      }
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={loanSearchConfig}
            datatableConfig={buildLoanSearchInputDataTableConfig(setValue)}
            cacheKey={[loansQueryKey]}
            {...config}
          />
        </PickerInputPanel>
      )}
      loader={getLoan}
      {...props}
    />
  )
}

export default LoanSearchInput

import { loansQueryKey } from '../lib/constants'
import { loanSearchConfig } from '../lib/config/loan-search-config'
import { buildLoanSearchInputDataTableConfig } from '../lib/config/loan-datatable-config'
import type { LoanQuery } from '../models/loanQuery'
import type { Loan } from '../models/loan'
import { DataPickerInputProps, Icon, PickerInputPanel } from '@/components'
import { DataTableContainer, LoanIcon, PickerInput } from '@/components'
import { useProjectId } from '@/features/projects'
import { buildLoanLabel } from '../lib/utils'
import { getLoan } from '../services/loanClient'

const LoanSearchInput = ({
  datatable,
  ...props
}: DataPickerInputProps<Loan, LoanQuery>) => {
  const [projectId] = useProjectId()

  return (
    <PickerInput<Loan, number>
      modalProps={{
        title: <Icon icon={LoanIcon}>Préstamos</Icon>,
      }}
      cacheKey={[loansQueryKey]}
      accesorFn={(l) => l?.id}
      visibleValueFn={(loan) => (loan ? buildLoanLabel(loan) : '---')}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={loanSearchConfig}
            datatableConfig={buildLoanSearchInputDataTableConfig(setValue)}
            initialQuery={{ projectId: projectId! }}
            cacheKey={[loansQueryKey, projectId!]}
            {...datatable}
          />
        </PickerInputPanel>
      )}
      loader={getLoan}
      {...props}
    />
  )
}

export default LoanSearchInput

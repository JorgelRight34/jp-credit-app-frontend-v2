import { loansQueryKey } from '../lib/constants'
import { loanSearchConfig } from '../lib/config/loan-search-config'
import { createLoanSearchInputDataTableConfig } from '../lib/config/loan-datatable-config'
import type { LoanQuery } from '../models/loanQuery'
import type { Loan } from '../models/loan'
import type { DataTableContainerOverrides, InputProps } from '@/components'
import { DataTableContainer, SearchableComboBox } from '@/components'
import { useProjectId } from '@/features/projects'
import { getLoanLabel } from '../lib/utils'

interface LoanSearchInputProps extends InputProps {
  datatable?: DataTableContainerOverrides<Loan, LoanQuery>
}

const LoanSearchInput = ({ datatable, ...props }: LoanSearchInputProps) => {
  const [projectId] = useProjectId()

  return (
    <SearchableComboBox<{ id: number }, number>
      modalProps={{
        title: 'Préstamos',
      }}
      cacheKey={[loansQueryKey]}
      accesorFn={(l) => l?.id ?? 0}
      visibleValueFn={(l) => (l ? getLoanLabel(l) : '---')}
      render={(setValue) => (
        <DataTableContainer
          searchConfig={loanSearchConfig}
          datatableConfig={createLoanSearchInputDataTableConfig(setValue)}
          cacheKey={[loansQueryKey, projectId]}
          {...datatable}
        />
      )}
      loader={(id) => ({ id })}
      {...props}
    />
  )
}

export default LoanSearchInput

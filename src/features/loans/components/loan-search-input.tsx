import { loansQueryKey } from '../lib/constants'
import { getLoan } from '../services/loanClient'
import { loanSearchConfig } from '../lib/config/loan-search-config'
import { createLoanSearchInputDataTableConfig } from '../lib/config/loan-datatable-config'
import type { LoanQuery } from '../models/loanQuery'
import type { Loan } from '../models/loan'
import type { DataTableContainerOverrides, InputProps } from '@/components'
import { DataTableContainer, SearchableComboBox } from '@/components'

interface LoanSearchInputProps extends InputProps {
  datatable?: DataTableContainerOverrides<Loan, LoanQuery>
}

const LoanSearchInput = ({ datatable, ...props }: LoanSearchInputProps) => {
  return (
    <SearchableComboBox<Loan, number>
      modalProps={{
        title: 'Préstamos',
        height: '90dvh',
        width: '50dvw',
      }}
      cacheKey={[loansQueryKey]}
      accesorFn={(l) => l?.id ?? 0}
      visibleValueFn={(l) => (l ? `Préstamo No.${l.id}` : '---')}
      render={(setValue) => (
        <DataTableContainer
          searchConfig={loanSearchConfig}
          datatableConfig={createLoanSearchInputDataTableConfig(setValue)}
          {...datatable}
        />
      )}
      loader={(id) => getLoan(id)}
      {...props}
    />
  )
}

export default LoanSearchInput

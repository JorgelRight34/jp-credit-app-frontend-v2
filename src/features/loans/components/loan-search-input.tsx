import { loansQueryKey } from '../lib/constants'
import { getLoan } from '../services/loanClient'
import type { Loan } from '../models/loan'
import type { InputProps } from '@/components'
import { SearchableComboBox } from '@/components'

const LoanSearchInput = (props: InputProps) => {
  return (
    <SearchableComboBox
      modalProps={{
        title: 'Préstamos',
        height: '90dvh',
        width: '50dvw',
      }}
      cacheKey={[loansQueryKey]}
      accesorFn={(l) => l?.id ?? 0}
      visibleValueFn={(l) => (l ? `Préstamo No.${l.id}` : '---')}
      render={(setValue) => (
        <>
          <button type="button" onClick={() => setValue({ id: 1 } as Loan)}>
            test
          </button>
        </>
      )}
      loader={getLoan}
      {...props}
    />
  )
}

export default LoanSearchInput

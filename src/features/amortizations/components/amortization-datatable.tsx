import {
  SearchFormContainer,
  SearchFormContainerOverrides,
  SearchFormValueConsumer,
  Table,
} from '@/components'
import { AmortizationCalculatorInput } from '../models/amortizationCalculatorInput'
import { amortizationSearchConfig } from '../lib/config/amortization-search-config'
import { amortizationDatatableColumns } from '../lib/config/amortization-datatable-config'
import { calculateAmortization } from '../lib/utils'

const AmortizationDataTable = (
  props: SearchFormContainerOverrides<AmortizationCalculatorInput>,
) => {
  return (
    <SearchFormContainer searchConfig={amortizationSearchConfig} {...props}>
      <SearchFormValueConsumer<AmortizationCalculatorInput>
        render={(input) => (
          <Table
            columns={amortizationDatatableColumns}
            data={
              calculateAmortization({
                principalBalance: Number(input.principalBalance),
                annualInterestRate: Number(input.annualInterestRate),
                paymentFrequency: Number(input.paymentFrequency),
                numberOfPayments: Number(input.numberOfPayments),
                compound: input.compound,
              }).amortizations
            }
          />
        )}
      />
    </SearchFormContainer>
  )
}

export default AmortizationDataTable

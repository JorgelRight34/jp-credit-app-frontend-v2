import {
  TableAndFormContainer,
  TableAndFormContainerOverrides,
} from '@/components'
import { AmortizationCalculatorInput } from '../models/amortizationCalculatorInput'
import { amortizationSearchConfig } from '../lib/config/amortization-search-config'
import { AmortizationPayment } from '../models/amortizationPayment'
import { amortizationDatatableColumns } from '../lib/config/amortization-datatable-config'
import { calculateAmortization } from '../lib/utils'

const AmortizationDataTable = (
  props: TableAndFormContainerOverrides<
    AmortizationPayment,
    AmortizationCalculatorInput
  >,
) => {
  return (
    <TableAndFormContainer
      searchConfig={amortizationSearchConfig}
      columns={amortizationDatatableColumns}
      loader={(input) =>
        calculateAmortization({
          principalBalance: Number(input.principalBalance),
          annualInterestRate: Number(input.annualInterestRate),
          paymentFrequency: Number(input.paymentFrequency),
          numberOfPayments: Number(input.numberOfPayments),
          compound: input.compound,
        }).amortizations
      }
      {...props}
    />
  )
}

export default AmortizationDataTable

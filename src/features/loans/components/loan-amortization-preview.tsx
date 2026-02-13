import { TableBuilder } from '@/components'
import {
  amortizationDatatableColumns,
  calculateAmortization,
  createAmortizationPaymentNumberColumn,
} from '@/features/amortizations'
import { AmortizationCalculatorInput } from '@/features/amortizations/models/amortizationCalculatorInput'

interface LoanAmortizationPreviewProps {
  calculationInput: AmortizationCalculatorInput
  startDate?: Date | string
}

const LoanAmortizationPreview = ({
  calculationInput,
  startDate,
}: LoanAmortizationPreviewProps) => {
  return (
    <div>
      <TableBuilder
        data={calculateAmortization(calculationInput).amortizations}
        pageSize={10}
        columns={[
          createAmortizationPaymentNumberColumn(
            startDate,
            calculationInput.paymentFrequency,
          ),
        ].concat(amortizationDatatableColumns)}
      />
    </div>
  )
}

export default LoanAmortizationPreview

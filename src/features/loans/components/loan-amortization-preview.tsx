import { TableBuilder } from '@/components'
import {
  AmortizationCalculatorInput,
  amortizationDatatableColumns,
  calculateAmortization,
  createAmortizationPaymentNumberColumn,
} from '@/features/amortizations'

interface LoanAmortizationPreviewProps {
  calculationInput: AmortizationCalculatorInput
  startDate?: Date | string
}

const LoanAmortizationPreview = ({
  calculationInput,
  startDate,
}: LoanAmortizationPreviewProps) => (
  <div>
    <TableBuilder
      data={calculateAmortization(calculationInput).amortizations}
      pageSize={50}
      columns={[
        createAmortizationPaymentNumberColumn(
          startDate,
          calculationInput.paymentFrequency,
        ),
      ].concat(amortizationDatatableColumns)}
    />
  </div>
)

export default LoanAmortizationPreview

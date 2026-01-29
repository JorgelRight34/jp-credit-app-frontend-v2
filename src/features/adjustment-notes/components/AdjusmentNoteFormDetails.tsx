import { FinancialCard } from '@/components/ui'
import useLoan from '@/features/Loans/hooks/useLoan'
import { toCurrency } from '@/lib/utils/utils'

type AdjusmentNoteFormDetailsProps = {
  loanId?: number
}

const AdjustmentNoteFormDetails = ({
  loanId,
}: AdjusmentNoteFormDetailsProps) => {
  const { loan } = useLoan({ id: loanId })

  return (
    <FinancialCard
      title={loanId ? `Prestamo #(${loanId})` : `Eliga un Préstamo`}
      orientation="row"
      subheading="Monto"
      heading={loan ? toCurrency(loan.disbursedAmount) : 'ND'}
      headers={[
        ['Total Adeudado', loan ? toCurrency(loan.paymentValue) : 'ND'],
        ['Valor Cuota', loan ? `${loan.paymentValue}%` : 'ND'],
        ['Atraso', loan ? toCurrency(loan.outstandingAmount || 0) : 'ND'],
      ]}
    />
  )
}

export default AdjustmentNoteFormDetails

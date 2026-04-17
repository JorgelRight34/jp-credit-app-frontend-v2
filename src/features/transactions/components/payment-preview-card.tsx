import { FinancialCard } from '@/components'
import { Loan } from '@/features/loans'
import { ND, toCurrency, toFormattedDate, toPercentage } from '@/lib/utils'
import { usePaymentPreviewCard } from '../hooks/usePaymentPreviewCard'

interface PaymentPreviewCardProps {
  loan: Loan | null
  amount?: number
  className?: string
}

const PaymentPreviewCard = ({ loan, amount = 0 }: PaymentPreviewCardProps) => {
  const { lateDays, fee, interest, nextPaymentDate } = usePaymentPreviewCard(
    amount,
    loan,
  )

  return (
    <FinancialCard
      title="CÁLCULOS"
      subheading="Cuota"
      heading={loan ? toCurrency(loan.paymentValue) : ND}
      className="shadow-sm"
      headers={[
        ['Penalidad', loan ? toPercentage(loan?.penaltyRate ?? 0) : ND],
        ['Días de gracia', loan?.daysOfGrace ?? ND],
        [
          'Últ. Pago',
          loan?.lastTransactionDate
            ? toFormattedDate(loan.lastTransactionDate)
            : ND,
        ],
        ['Fecha pago', nextPaymentDate ? toFormattedDate(nextPaymentDate) : ND],
        ['Días de atraso', loan ? lateDays : ND],
        ['Mora', loan ? toCurrency(fee) : ND],
        ['Interés', loan ? toCurrency(interest) : ND],
        ['Capital', loan ? toCurrency(Math.max(0, amount - interest)) : ND],
      ]}
    />
  )
}

export default PaymentPreviewCard

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
      title="CALCULOS"
      subheading="Monto"
      className="shadow-sm"
      headers={[
        ['Cuota', loan ? toCurrency(loan?.paymentValue ?? 0) : ND],
        ['Penalidad', loan ? toPercentage(loan?.penaltyRate ?? 0) : ND],
        ['Días de gracia', loan?.daysOfGrace ?? ND],
        [
          'Últ. Pago',
          loan?.lastPaymentDate ? toFormattedDate(loan.lastPaymentDate) : ND,
        ],
        ['Fecha pago', nextPaymentDate ? toFormattedDate(nextPaymentDate) : ND],
        ['Días de atraso', loan ? lateDays : ND],
        ['Mora', loan ? toCurrency(fee) : ND],
        ['Interés', loan ? toCurrency(interest) : ND],
        ['Capital', loan ? toCurrency(Math.max(0, amount - interest)) : ND],
      ]}
      heading={toCurrency(amount)}
    />
  )
}

export default PaymentPreviewCard

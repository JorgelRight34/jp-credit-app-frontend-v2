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
      className="shadow-sm"
      headingClassName="py-4"
      headers={[
        ['Cuota', toCurrency(loan?.paymentValue ?? 0)],
        ['Penalidad', toPercentage(loan?.penaltyRate ?? 0)],
        ['Días de gracia', loan?.daysOfGrace ?? ND],
        [
          'Últ. Pago',
          loan?.lastPaymentDate ? toFormattedDate(loan.lastPaymentDate) : ND,
        ],
        ['Fecha esperada', toFormattedDate(nextPaymentDate)],
        ['Días de atraso', lateDays],
        ['Mora', toCurrency(fee)],
        ['Interés', toCurrency(interest)],
        ['Capital', toCurrency(Math.max(0, amount - interest))],
      ]}
      heading={toCurrency(amount)}
    />
  )
}

export default PaymentPreviewCard

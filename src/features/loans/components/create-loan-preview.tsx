import { FinancialCard, InfoIcon } from '@/components'
import { getPmt, getTotalInterest, toCurrency } from '@/lib/utils'
import { useMemo } from 'react'

interface CreateLoanFormPreviewProps {
  amount: number
  annualInterestRate: number
  nPer: number
  paymentFrequency: number
  className?: string
}

const CreateLoanFormPreview = ({
  amount,
  nPer,
  annualInterestRate,
  paymentFrequency,
  className = '',
}: CreateLoanFormPreviewProps) => {
  const details = useMemo<{ pmt: number; totalInterest: number }>(() => {
    if (!nPer || nPer === 0 || !amount) return { pmt: 0, totalInterest: 0 }

    const calculatedPmt =
      getPmt(annualInterestRate ?? 0, paymentFrequency ?? 0, nPer, amount) || 0

    const totalInterest =
      calculatedPmt && nPer && nPer > 0 && amount
        ? getTotalInterest(calculatedPmt, nPer, amount)
        : 0

    return { pmt: calculatedPmt, totalInterest: totalInterest }
  }, [annualInterestRate, amount, nPer, paymentFrequency])

  return (
    <FinancialCard
      className={className}
      headingClassName="py-4 text"
      icon={InfoIcon}
      title="Prevista del préstamo"
      subheading="Cuota"
      heading={toCurrency(details.pmt)}
      headers={[
        ['Monto', toCurrency(amount || 0)],
        [
          'Interés anual',
          annualInterestRate
            ? `${(annualInterestRate * 100).toFixed(2)}%`
            : `0%`,
        ],
        ['Interés total pagado', toCurrency(details.totalInterest || 0)],
        ['Capital total pagado', toCurrency(amount || 0)],
        ['Pagos por año', paymentFrequency ? paymentFrequency : 'N/D'],
      ]}
    />
  )
}

export default CreateLoanFormPreview

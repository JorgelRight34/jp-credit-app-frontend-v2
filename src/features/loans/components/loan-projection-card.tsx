import { FinancialCard } from '@/components'
import { getPmt, getTotalInterest, toCurrency } from '@/lib/utils'
import { useMemo } from 'react'
import { loanPaymentFrequencyStringMap } from '../lib/constants'
import { LoanPaymentFrequency } from '../models/loan'

interface LoanProjectionCardProps {
  amount: number
  annualInterestRate: number
  nPer: number
  paymentFrequency: LoanPaymentFrequency
  className?: string
}

const LoanProjectionCard = ({
  amount,
  nPer,
  annualInterestRate,
  paymentFrequency,
  className = '',
}: LoanProjectionCardProps) => {
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
      headingClassName="py-4"
      title="PREVISTA DEL PRESTAMO"
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
        ['Interés total', toCurrency(details.totalInterest || 0)],
        ['Capital total', toCurrency(amount || 0)],
        [
          'Frecuencia',
          paymentFrequency
            ? loanPaymentFrequencyStringMap[paymentFrequency]
            : 'N/D',
        ],
      ]}
    />
  )
}

export default LoanProjectionCard

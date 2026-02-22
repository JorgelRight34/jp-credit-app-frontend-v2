import { calculateLoanNextPaymentDate, Loan } from "@/features/loans"
import { calculatePenaltyFee, calculatePeriodInterest, getLateDays } from "@/lib/utils"
import { useMemo } from "react"

export const usePaymentPreviewCard = (amount: number, loan: Loan | null) => {
    const nextPaymentDate = useMemo(
        () => (loan ? calculateLoanNextPaymentDate(loan) : undefined),
        [loan],
    )

    const lateDays = useMemo(() => {
        if (!loan) return 0
        return getLateDays(nextPaymentDate!, loan.daysOfGrace)
    }, [loan])

    const fee = useMemo(() => {
        if (!loan) return 0
        return calculatePenaltyFee(
            nextPaymentDate!,
            loan.daysOfGrace,
            loan.penaltyRate,
        )
    }, [loan])

    const interest = useMemo(() => {
        if (amount === 0 || !loan) return 0
        return Math.min(
            amount,
            calculatePeriodInterest(
                loan.principalBalance,
                loan.annualInterestRate,
                loan.paymentFrequency,
            ),
        )
    }, [loan, amount])

    return { lateDays, fee, interest }
}

import { isFiniteNumber } from "@/lib/utils";
import { Amortization } from "../models/amortization";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import { AmortizationPayment } from "../models/amortizationPayment";

export const validateAmortizationInput = ({
    principalBalance,
    annualInterestRate,
    paymentFrequency,
    numberOfPayments,
}: AmortizationCalculatorInput) => {
    return (
        paymentFrequency !== undefined && paymentFrequency > 0 &&
        numberOfPayments !== undefined && numberOfPayments > 0 &&
        annualInterestRate !== undefined && annualInterestRate > 0 &&
        principalBalance !== undefined && principalBalance > 0
    )
}

/**
 * Standard fixed-payment amortization schedule (annuity formula).
 * - No rounding applied (keeps full precision like your sample).
 * - Interest computed on current balance each period.
 * - Last payment principal is adjusted to close the balance (avoids small residue).
 */
export const calculateAmortization = ({
    principalBalance,
    annualInterestRate,
    paymentFrequency,
    numberOfPayments,
}: AmortizationCalculatorInput): Amortization => {
    console.log("calculating.....")
    if (!isFiniteNumber(principalBalance) || principalBalance <= 0) {
        return { amortizations: [], paymentValue: 0, totalInterest: 0 }
    }
    if (!isFiniteNumber(numberOfPayments) || numberOfPayments <= 0) {
        return { amortizations: [], paymentValue: 0, totalInterest: 0 }
    }
    if (!isFiniteNumber(annualInterestRate) || annualInterestRate <= 0) {
        return { amortizations: [], paymentValue: 0, totalInterest: 0 }
    }

    const periodsPerYear = paymentFrequency ?? 12
    const r = toRate01(annualInterestRate) / periodsPerYear // periodic rate
    const n = numberOfPayments

    // Payment (annuity). If rate is 0, it's just principal / n.
    const paymentValue =
        r === 0
            ? principalBalance / n
            : (principalBalance * r) / (1 - Math.pow(1 + r, -n))

    const amortizations: AmortizationPayment[] = []
    let balance = principalBalance
    let totalInterest = 0

    for (let i = 1; i <= n; i++) {
        const interestValue = balance * r
        let capitalValue = paymentValue - interestValue

        // Adjust last installment so we close the loan even with floating-point residue
        if (i === n) {
            capitalValue = balance
        }

        balance = balance - capitalValue
        totalInterest += interestValue

        amortizations.push({
            interestValue,
            capitalValue,
            principalBalance: balance,
            total: i === n ? interestValue + capitalValue : paymentValue,
            number: i,
        })
    }

    return {
        amortizations,
        paymentValue,
        totalInterest,
    }
}

const toRate01 = (annualInterestRate: number) => {
    return annualInterestRate > 1 ? annualInterestRate / 100 : annualInterestRate
}

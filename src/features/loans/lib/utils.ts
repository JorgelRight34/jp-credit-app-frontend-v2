import { toDate } from "@/lib/utils"
import { Loan, LoanPaymentFrequency } from "../models/loan";

export const buildLoanLabel = ({ id }: { id: number; }) => `PR-${id}`
export const buildLoanLabelById = (id: number) => `PR-${id}`

export const getDaysBetweenPayments = (paymentFrequency: LoanPaymentFrequency): number => {
    return Math.floor(365 / paymentFrequency)
}

export const calculateNextPaymentDate = (args: {
    principalBalance: number
    startDate: Date | string
    paymentFrequency: LoanPaymentFrequency
    referenceDate?: Date | string
}): Date => {
    const {
        principalBalance,
        startDate,
        paymentFrequency,
        referenceDate = new Date(),
    } = args
    const MS_PER_DAY = 24 * 60 * 60 * 1000

    if (principalBalance <= 0)
        return new Date(8640000000000000);

    const start = toDate(startDate)
    const reference = toDate(referenceDate)

    const daysBetweenPayments = getDaysBetweenPayments(paymentFrequency)

    if (start.getTime() > reference.getTime())
        return start;

    const elapsedDays = (reference.getTime() - start.getTime()) / MS_PER_DAY
    const periodsPassed = Math.floor(elapsedDays / daysBetweenPayments) + 1

    return new Date(start.getTime() + periodsPassed * daysBetweenPayments * MS_PER_DAY)
}

export const calculateLoanDebt = (loan: Loan, date: Date): [capitalDebt: number, interestDebt: number, fee: number] => {
    if (loan.principalBalance === 0) return [0, 0, 0]

    const start = new Date(loan.startDate);
    start.setDate(start.getDate() - loan.daysOfGrace);
    console.log('[calculateLoanDebt] Input:', { date, start, loan });

    const daysSinceStart = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysBetweenPayments = Math.floor(365 / loan.paymentFrequency);
    const paymentsElapsed = Math.min(
        Math.floor(daysSinceStart / daysBetweenPayments),
        loan.numberOfPayments
    );
    console.log('[calculateLoanDebt] Payments elapsed:', paymentsElapsed, '| frequency:', loan.paymentFrequency, '| total payments:', loan.numberOfPayments);

    const interestPerPayment = loan.approvedAmount * (loan.annualInterestRate / loan.paymentFrequency);
    const capitalPerPayment = loan.paymentValue - interestPerPayment;
    console.log('[calculateLoanDebt] Per payment breakdown:', { paymentValue: loan.paymentValue, interestPerPayment, capitalPerPayment });

    const expectedCapital = capitalPerPayment * paymentsElapsed;
    const expectedInterest = interestPerPayment * paymentsElapsed;
    console.log('[calculateLoanDebt] Expected by now:', { expectedCapital, expectedInterest });

    const paidCapital = loan.disbursedAmount - loan.principalBalance;
    const paidInterest = loan.accruedInterest;
    console.log('[calculateLoanDebt] Actually paid:', { paidCapital, paidInterest, disbursedAmount: loan.disbursedAmount, principalBalance: loan.principalBalance });

    const overduePayments = paymentsElapsed - (paidCapital / capitalPerPayment);
    console.log('[calculateLoanDebt] Overdue payments:', overduePayments);

    const fee = overduePayments > 0
        ? loan.penaltyRate * capitalPerPayment * (overduePayments * (overduePayments + 1) / 2)
        : 0;
    console.log('[calculateLoanDebt] Fee:', { fee, penaltyRate: loan.penaltyRate, overduePayments });

    const result: [number, number, number] = [
        Math.max(0, expectedCapital - paidCapital),
        Math.max(0, expectedInterest - paidInterest),
        fee
    ];
    console.log('[calculateLoanDebt] Result — capitalDebt:', result[0], '| interestDebt:', result[1], '| fee:', result[2]);

    return result;
}
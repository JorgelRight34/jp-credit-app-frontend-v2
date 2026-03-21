export const getPmt = (
    annualInterestRate: number,
    paymentFrequency: number,
    nPer: number,
    amount: number
) => {
    const r = annualInterestRate / paymentFrequency; // Interest rate per period
    const n = nPer; // Total number of payments

    if (r === 0) return amount / n;

    const pmt = (r * amount) / (1 - Math.pow(1 + r, -n));
    return Number(pmt.toFixed(2));
};

export const getTotalInterest = (pmt: number, nPer: number, amount: number) => {
    const total = pmt * nPer - amount;
    return total;
};

export const formatNumberWithCommas = (value: number): string => {
    return new Intl.NumberFormat().format(value);
}

export const toPercentage = (number: number): string => {
    return `${(number * 100).toFixed(2)}%`
}

export const isFiniteNumber = (n: unknown): n is number =>
    typeof n === 'number' && Number.isFinite(n)

// payment-calculations.ts
import { TimeSpan } from '@/lib/utils' // or wherever your TimeSpan is

type DateLike = Date | string | number

const toDate = (d: DateLike) => (d instanceof Date ? d : new Date(d))

/** Returns whole late days between (today + graceDays) and dueDate. Never negative. */
export const getLateDays = (
    dueDate: DateLike,
    graceDays: number,
    now: Date = new Date(),
) => {
    const adjustedNow = new Date(now)
    adjustedNow.setDate(adjustedNow.getDate() + graceDays)

    const diffInMs = adjustedNow.getTime() - toDate(dueDate).getTime()
    const lateDays = Math.floor(diffInMs / TimeSpan.fromDays(1))

    return Math.max(0, lateDays)
}

/** Returns penalty fee based on late days and per-day penalty rate. */
export const calculatePenaltyFee = (
    dueDate: DateLike,
    graceDays: number,
    penaltyRatePerDay: number,
    now?: Date,
) => {
    const lateDays = getLateDays(dueDate, graceDays, now ?? new Date())
    return lateDays <= 0 ? 0 : lateDays * penaltyRatePerDay
}

/** Calculates interest portion for a payment period. */
export const calculatePeriodInterest = (
    principalBalance: number,
    annualInterestRate: number,
    paymentFrequency: number, // e.g. 12 monthly
) => {
    if (!principalBalance || !annualInterestRate || !paymentFrequency) return 0
    return principalBalance * (annualInterestRate / paymentFrequency)
}

/** Calculates capital as amount  */
export const calculateCapital = (amount: number, interest: number) => {
    if (!amount) return 0
    return amount - interest
}
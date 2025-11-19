export const getPmt = (
    annualInterestRate: number,
    paymentFrequency: number,
    nPer: number,
    amount: number
) => {
    const r = annualInterestRate / paymentFrequency; // Interest rate per period
    const n = nPer; // Total number of payments

    if (r === 0) return amount / n; // No interest

    // PMT formula
    const pmt = (r * amount) / (1 - Math.pow(1 + r, -n));
    return Number(pmt.toFixed(2));
};

export const getTotalInterest = (pmt: number, nPer: number, amount: number) => {
    const total = pmt * nPer - amount;
    return total;
};

export const toCurrency = (money: number | undefined): string | number => {
    if (money === undefined) return NaN;
    const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(money);

    return formattedAmount;
};
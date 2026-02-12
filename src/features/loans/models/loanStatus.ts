export const LoanStatusMap = {
    active: "active",
    agreement: "agreement",
    judicial: "judicial",
    legal: "legal",
    punished: "punished",
    settled: "settled",
    paidOff: "paidOff",
    overdue: "overdue"
} as const;

export type LoanStatus = typeof LoanStatusMap[keyof typeof LoanStatusMap];
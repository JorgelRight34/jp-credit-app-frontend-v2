export const LoanStatusMap = {
    Active: "active",
    Agreement: "agreement",
    Judicial: "judicial",
    Legal: "legal",
    Punished: "punished",
    Settled: "settled",
    PaidOff: "paidOff",
    Overdue: "overdue"
} as const;

export type LoanStatus = typeof LoanStatusMap[keyof typeof LoanStatusMap];
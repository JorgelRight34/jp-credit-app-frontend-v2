export const LoanStatusMap = {
    active: "active",
    inactive: "inactive",
    punished: "punished",
    expired: "expired"
} as const;

export type LoanStatus = typeof LoanStatusMap[keyof typeof LoanStatusMap];
export const collateralTypeMap = {
    carLoan: "carLoan",
    mortgage: "mortgage",
    agriculturalLoan: "agriculturalLoan",
} as const

export type CollateralType = typeof collateralTypeMap[keyof typeof collateralTypeMap]
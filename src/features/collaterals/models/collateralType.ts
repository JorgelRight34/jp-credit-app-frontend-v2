export const CollateralTypeMap = {
    CarLoan: "carLoan",
    Mortgage: "mortgage",
    AgriculturalLoan: "agriculturalLoan",
} as const

export type CollateralType = typeof CollateralTypeMap[keyof typeof CollateralTypeMap]
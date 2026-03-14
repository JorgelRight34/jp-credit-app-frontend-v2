import { CollateralCondition, CollateralType } from "@/features/collaterals"
import { Loan } from "@/features/loans"

export interface CollateralReportModel {
    id: number
    title: string
    description?: string
    value: number
    loanId: number
    location?: string
    liquidationDate?: string
    expirationDate?: string
    updatedAt?: string
    type: CollateralType
    condition?: CollateralCondition
    loan: Loan
}
import { LoanSearchInput } from "@/features/loans";
import { Report } from "../models/report";
import { CollateralSearchInput } from "@/features/collaterals";
import { InputElement, SelectOptions } from "@/components";
import { TransactionSearchInput } from "@/features/transactions";

export const reportTemplateKeysLabels: Record<Report["key"], string> = {
    loan: "Préstamo",
    collateral: "Garantía",
    transaction: "Transacciones"
}

export const reportTemplateKeysInputMap: Record<Report['key'], InputElement> = {
    loan: (p) => LoanSearchInput(p),
    collateral: (p) => CollateralSearchInput(p),
    transaction: p => TransactionSearchInput(p)
}

export const reportKeySelectOptions: SelectOptions<Report["key"]> = [
    ['loan', 'Préstamos'],
    ['collateral', 'Garantía'],
    ['transaction', 'Transación']
]

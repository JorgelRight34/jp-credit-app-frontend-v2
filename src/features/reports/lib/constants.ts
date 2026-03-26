import { LoanSearchInput } from "@/features/loans";
import { Report } from "../models/report";
import { CollateralSearchInput } from "@/features/collaterals";
import { InputElement, PickerInputElement, SelectOptions } from "@/components";
import { TransactionSearchInput } from "@/features/transactions";

export const reportTemplateKeysLabels: Record<Report["key"], string> = {
    loan: "Préstamo",
    collateral: "Garantía",
    transaction: "Transacción"
}

export const reportTemplateKeysInputMapAside: Record<Report['key'], InputElement> = {
    loan: (p) => LoanSearchInput(p),
    collateral: (p) => CollateralSearchInput(p),
    transaction: p => TransactionSearchInput(p)
}

export const reportTemplateKeysInputMap = reportTemplateKeysInputMapAside as Record<Report['key'], PickerInputElement>;

export const reportKeySelectOptions: SelectOptions<Report["key"]> = [
    ['loan', 'Préstamos'],
    ['collateral', 'Garantías'],
    ['transaction', 'Transacciónes']
]

import { LoanSearchInput } from "@/features/loans";
import { Report } from "../models/report";
import { CollateralSearchInput } from "@/features/collaterals";
import { InputElement, SelectOptions } from "@/components";

export const reportTemplateKeysLabels: Record<Report["key"], string> = {
    loan: "Préstamo",
    collateral: "Garantía"
}

export const reportTemplateKeysInputMap: Record<Report['key'], InputElement> = {
    loan: LoanSearchInput,
    collateral: CollateralSearchInput,
}

export const reportKeySelectOptions: SelectOptions<Report["key"]> = [['loan', 'Préstamos'], ['collateral', 'Garantía']]
import { DateInput, NumericInput, SearchFormConfig } from "@/components";
import { AdjustmentNoteQuery } from "../../models/adjustmentNoteQuery";
import { LoanSearchInput } from "@/features/loans";

export const adjusmentNoteSearchConfig: SearchFormConfig<AdjustmentNoteQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: (p) => NumericInput(p) },
        { name: "startDate", label: "Inicio", width: 5, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fin", width: 5, type: (p) => DateInput(p) },
    ],
    advanced: [
        { name: "loanId", label: "Préstamo", width: 6, type: p => LoanSearchInput(p) }
    ],
}
import { Input, NumericInput, SearchFormConfig } from "@/components";
import { LoanPurposeQuery } from "../../models/loanPurposeQuery";

export const loanPurposeSearchConfig: SearchFormConfig<LoanPurposeQuery> = {
    options: [{ name: "name", label: "Destino", width: 12, type: (p) => Input(p) }],
    advanced: [{ name: "id", label: "Id", width: 12, type: p => NumericInput(p) }]
}

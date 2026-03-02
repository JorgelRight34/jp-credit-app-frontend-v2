import { DateInput, Input, NumericInput, SearchFormConfig } from "@/components";
import { LoanSearchInput } from "@/features/loans";
import { FollowUpQuery } from "../../models/followUpQuery";
import { ClientSearchInput } from "@/features/profiles";

export const followUpSearchConfig: SearchFormConfig<FollowUpQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: p => NumericInput(p) },
        { name: "title", label: "Título", width: 10, type: p => Input(p) }
    ],
    advanced: [
        { name: "loanId", label: "Préstamo", width: 6, type: p => LoanSearchInput(p) },
        { name: "clientId", label: "Cliente", width: 6, type: p => ClientSearchInput(p) },
        { name: "startDate", label: "Fecha inicio", width: 6, type: p => DateInput(p) },
        { name: "endDate", label: "Fecha fin", width: 6, type: p => DateInput(p) }
    ],
}
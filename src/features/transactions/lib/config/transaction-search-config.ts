import { DateInput, NumericInput, SearchFormConfig } from "@/components";
import { TransactionQuery } from "../../models/transactionQuery";
import { LoanSearchInput } from "@/features/loans";

export const transactionSearchConfig: SearchFormConfig<TransactionQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: (p) => NumericInput(p) },
        { name: "startDate", label: "Fecha inicio", width: 5, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fecha fin", width: 5, type: (p) => DateInput(p) },
    ],
    advanced: [
        { name: "loanId", label: "Préstamo", width: 6, type: p => LoanSearchInput(p) }
    ],
    defaultValues: { id: null, startDate: null, endDate: null, loanId: null }
}
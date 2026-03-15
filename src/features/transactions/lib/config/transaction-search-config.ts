import { DateInput, NumericInput, SearchFormConfig } from "@/components";
import { TransactionQuery } from "../../models/transactionQuery";
import { LoanSearchInput } from "@/features/loans";

export const transactionSearchConfig: SearchFormConfig<TransactionQuery> = {
    options: [
        { name: "id", label: "No. Documento", width: 2, type: (p) => NumericInput(p) },
    ],
    advanced: [
        { name: "startDate", label: "Inicio", width: 5, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fin", width: 5, type: (p) => DateInput(p) },
        { name: "loanId", label: "Préstamo", width: 6, type: p => LoanSearchInput(p) }
    ],
}
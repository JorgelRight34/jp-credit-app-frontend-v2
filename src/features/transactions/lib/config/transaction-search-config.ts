import { DateInput, NumericInput, SearchFormConfig } from "@/components";
import { TransactionQuery } from "../../models/transactionQuery";
import { LoanSearchInput } from "@/features/loans";
import { exportTransactions } from "../../services/transactionClient";

export const transactionSearchConfig: SearchFormConfig<TransactionQuery> = {
    options: [
        { name: "id", label: "No. Documento", width: 12, type: (p) => NumericInput(p) },
    ],
    advanced: [
        { name: "startDate", label: "Inicio", width: 6, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fin", width: 6, type: (p) => DateInput(p) },
        { name: "loanId", label: "Préstamo", width: 12, type: p => LoanSearchInput(p) }
    ],
    onExport: exportTransactions
}
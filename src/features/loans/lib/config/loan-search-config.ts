import type { LoanQuery } from "../../models/loanQuery";
import { DateInput, Input, NumericInput, Select, type SearchFormConfig } from "@/components";
import { loanStatusSelectOptions } from "../constants";
import { exportLoans } from "../../services/loanClient";
import { ClientSearchInput } from "@/features/profiles";

export const loanSearchConfig: SearchFormConfig<LoanQuery> = {
    options: [
        { name: "id", label: "Id préstamo", width: 12, type: (p) => Input(p) },
    ],
    advanced: [
        { name: "clientProfileId", label: "Cliente", width: 6, type: (p) => ClientSearchInput(p) },
        { name: "status", label: "Estado", width: 6, type: (p) => Select({ ...p, options: loanStatusSelectOptions }) },
        { name: "minPaymentValue", label: "Cuota mínima", width: 6, type: (p) => NumericInput(p) },
        { name: "maxPaymentValue", label: "Cuota máxima", width: 6, type: (p) => NumericInput(p) },
        { name: "startDate", label: "Fecha mínima", width: 6, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fecha máxima", width: 6, type: (p) => DateInput(p) },
    ],
    onExport: exportLoans
}
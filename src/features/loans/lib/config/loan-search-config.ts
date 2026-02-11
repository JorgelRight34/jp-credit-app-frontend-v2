import type { LoanQuery } from "../../models/loanQuery";
import { DateInput, Input, NumericInput, Select, type SearchFormConfig } from "@/components";
import { loanStatusSelectOptions } from "../constants";

export const loanSearchConfig: SearchFormConfig<LoanQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: (p) => Input(p) },
        { name: "clientName", label: "Cliente", width: 7, type: (p) => Input(p) },
        { name: "status", label: "Estado", width: 7, type: (p) => Select({ ...p, options: loanStatusSelectOptions }) },
    ],
    advanced: [
        { name: "minPaymentValue", label: "Cuota mínima", width: 6, type: (p) => NumericInput(p) },
        { name: "maxPaymentValue", label: "Cuota máxima", width: 6, type: (p) => NumericInput(p) },
        { name: "startDate", label: "Fecha mínima", width: 6, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fecha máxima", width: 6, type: (p) => DateInput(p) },
    ]
}
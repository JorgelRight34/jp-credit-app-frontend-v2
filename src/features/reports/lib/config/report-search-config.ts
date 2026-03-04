import { DateInput, Input, NumericInput, SearchFormConfig } from "@/components";
import { ReportQuery } from "../../models/reportQuery";

export const reportSearchConfig: SearchFormConfig<ReportQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: p => NumericInput(p) },
        { name: "title", label: "Título", width: 10, type: p => Input(p) },
    ],
    advanced: [
        { name: "createdAt", label: "Fecha creación", width: 12, type: p => DateInput(p) }
    ]
}

import { DateInput, Input, NumericInput, SearchFormConfig, withSelectOptions } from "@/components";
import { ReportQuery } from "../../models/reportQuery";
import { Report } from "../../models/report";

export const reportSearchConfig: SearchFormConfig<ReportQuery> = {
    options: [
        { name: "id", label: "Id", width: 2, type: p => NumericInput(p) },
        { name: "title", label: "Título", width: 10, type: p => Input(p) },
        {
            name: "key", label: "Categoría", width: 4, type: withSelectOptions<Report["key"]>([
                ["loan", "Préstamos"],
                ["collateral", "Garantías"]
            ])
        }
    ],
    advanced: [
        { name: "createdAt", label: "Fecha creación", width: 12, type: p => DateInput(p) }
    ]
}

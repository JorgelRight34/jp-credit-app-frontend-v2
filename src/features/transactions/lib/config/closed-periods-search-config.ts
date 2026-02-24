import { DateInput, NumericInput, SearchFormConfig } from "@/components";
import { ClosedPeriodQuery } from "../../models/closedPeriodQuery";

export const closedPeriodsSearchConfig: SearchFormConfig<ClosedPeriodQuery> = {
    options: [
        { name: "id", width: 2, label: "Id", type: p => NumericInput(p) },
        { name: "startDate", label: "Fecha inicio", width: 5, type: (p) => DateInput(p) },
        { name: "endDate", label: "Fecha fin", width: 5, type: (p) => DateInput(p) },
    ],
    advanced: [],
    defaultValues: { id: '', startDate: '', endDate: '' }
}